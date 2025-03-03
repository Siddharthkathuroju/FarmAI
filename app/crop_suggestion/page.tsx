"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react"; // Loading spinner

const formSchema = z.object({
  nitrogen: z.string().min(1, "Field is required"),
  phosphorus: z.string().min(1, "Field is required"),
  potassium: z.string().min(1, "Field is required"),
  temperature: z.string().min(1, "Field is required"),
  humidity: z.string().min(1, "Field is required"),
  ph: z.string().min(1, "Field is required"),
  rainfall: z.string().min(1, "Field is required"),
});

interface Response {
  crop: string;
  confidence: string;
}

export default function CropSuggestionPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [cropSuggestion, setCropSuggestion] = useState<Response | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
    },
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setCropSuggestion(null);
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/recommend_crop",
        {
          N: parseFloat(values.nitrogen),
          P: parseFloat(values.phosphorus),
          K: parseFloat(values.potassium),
          temperature: parseFloat(values.temperature),
          humidity: parseFloat(values.humidity),
          ph: parseFloat(values.ph),
          rainfall: parseFloat(values.rainfall),
        }
      );
      console.log(data);
      setCropSuggestion(data);
    } catch (error) {
      console.error("Error fetching crop recommendation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=<API_KEY>"
        );
        const data = await response.json();
        form.setValue("temperature", (data.main.temp - 273).toFixed(2));
        form.setValue("humidity", data.main.humidity.toString());
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br p-4">
      <Card className="shadow-lg border rounded-2xl max-w-lg w-full p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-green-700">
            Crop Suggestion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {[
                "nitrogen",
                "phosphorus",
                "potassium",
                "temperature",
                "humidity",
                "ph",
                "rainfall",
              ].map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize text-gray-600">
                        {field.name}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`Enter ${field.name}`}
                          className="rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="submit"
                className="w-full font-medium py-2 rounded-md flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                {loading ? "Processing..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading ? (
        <div className="mt-6 p-4 text-gray-700 text-lg font-medium">
          Fetching recommendation...
        </div>
      ) : (
        cropSuggestion && (
          <Card className="mt-6 shadow-md border rounded-2xl max-w-lg w-ful p-6">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold text-green-700">
                Suggested Crop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-lg text-gray-700 font-medium border-b pb-2">
                <span>Crop:</span>
                <span className="text-green-700 font-semibold">
                  {cropSuggestion.crop}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700 font-medium mt-3">
                <span>Confidence:</span>
                <span className="text-green-700 font-semibold">
                  {(parseFloat(cropSuggestion.confidence) * 100).toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
