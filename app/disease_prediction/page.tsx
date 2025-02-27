"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { predictDisease } from "@/app/actions";
import ReactMarkdown from "react-markdown";

export default function CropDiseasePredictor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<{
    disease: string;
    confidence: string;
    suggestion: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check if file is an image
    if (!selectedFile.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setPrediction(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];

      // Check if file is an image
      if (!droppedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      setFile(droppedFile);
      const objectUrl = URL.createObjectURL(droppedFile);
      setPreview(objectUrl);
      setPrediction(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const result = await predictDisease(formData);
      setPrediction(result);
    } catch (error) {
      toast({
        title: "Error analyzing image",
        description:
          "There was a problem processing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setPrediction(null);
  };

  return (
    <div className="max-w-3xl mx-auto pt-12">
      <div
        className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center ${
          preview ? "border-primary" : "border-muted-foreground"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <div className="space-y-4">
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Preview"
                fill
                className="object-contain rounded-md"
              />
            </div>
            <div className="flex justify-center gap-2">
              <Button onClick={resetForm} variant="outline">
                Choose Different Image
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-10">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Upload Crop Image</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop an image here, or click to select a file
            </p>
            <Button asChild variant="secondary">
              <label className="cursor-pointer">
                Select Image
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </Button>
          </div>
        )}
      </div>

      {prediction && (
        <Card className="mb-6 overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle>Disease Prediction Results</CardTitle>
            <CardDescription>
              Analysis based on the uploaded crop image
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-1">Identified Disease</h3>
                <p className="text-2xl font-bold text-primary">
                  {prediction.disease}
                </p>
                <p className="text-sm text-muted-foreground">
                  Confidence: {parseFloat(prediction.confidence) * 100}%
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Treatment Suggestions
                </h3>
                <ReactMarkdown>{prediction.suggestion}</ReactMarkdown>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Start Over
            </Button>
            <Button variant="default">Save Report</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
