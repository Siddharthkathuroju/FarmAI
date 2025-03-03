import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  LineChart,
  TreesIcon as Plant,
  Sprout,
  Sun,
  Tractor,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Smart Farming with{" "}
                  <span className="text-green-600 dark:text-green-400">
                    FarmAI
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your AI-powered farming assistant, custom trained to answer
                  all your agricultural queries and help you grow better crops.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/chat">
                  <Button className="bg-green-600 hover:bg-green-700 px-8">
                    Start Growing <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="px-8">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Farming Solutions
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Expert agricultural advice powered by AI
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8 py-8">
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mb-2">
                      <Sprout className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Crop Advisor</CardTitle>
                    <CardDescription>
                      Expert guidance for optimal crop growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get personalized recommendations for crop selection,
                      planting schedules, and growing techniques based on your
                      soil and climate.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">
                      Learn more
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mb-2">
                      <Sprout className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Disease Detection</CardTitle>
                    <CardDescription>
                      Identify crop diseases and get preventive measures
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upload images of your crops to detect diseases early and
                      receive suggestions for preventive measures to protect
                      your yield.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">
                      Learn more
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mb-2">
                      <Plant className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Pest Management</CardTitle>
                    <CardDescription>
                      Identify and treat plant diseases and pests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Upload photos of affected plants to get instant
                      identification of diseases and pests, with organic and
                      conventional treatment options.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">
                      Learn more
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mb-2">
                      <LineChart className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Market Insights</CardTitle>
                    <CardDescription>
                      Data-driven market analysis for better profits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Access real-time market prices, demand forecasts, and
                      optimal selling times to maximize your farm's
                      profitability.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm">
                      Learn more
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Farmers Trust Us
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  FarmAI is built specifically for agricultural needs
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 py-8">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                  <Tractor className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold">Farm-Specific Training</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Our AI is trained on agricultural data from thousands of
                    farms across different regions and climates.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                  <Sun className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold">Local Climate Awareness</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Get advice tailored to your specific location, weather
                    patterns, and growing conditions.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                  <Cloud className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-bold">Always Available</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Get farming advice 24/7, even during busy planting and
                    harvest seasons when you need it most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
