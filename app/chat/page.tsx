"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Code, Globe, Leaf, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar";
import ReactMarkdown from "react-markdown";
import translate from "./translate";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface PostData {
  text: string;
}

interface ApiResponse {
  output: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    "English en",
    "Hindi hi",
    "Telugu te",
    "Tamil ta",
    "Kannada kn",
    "Malayalam ml",
    "Punjabi pa",
  ];

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const translatedInput =
      selectedLanguage == "English en" ? input : await translate(input, "en");

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // AI response
    try {
      const response = await getFarmingResponse(input);
      const langCode = selectedLanguage.split(" ")[1];
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          selectedLanguage == "English en"
            ? response
            : await translate(response, langCode),
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getFarmingResponse = async (userInput: string): Promise<string> => {
    try {
      const data: PostData = { text: userInput };
      const response = await axios.post<ApiResponse>(
        "http://127.0.0.1:5000/api/model",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", response.data.output);
      return response.data.output;
    } catch (error) {
      throw error;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar /> */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-36">
            <div className="mx-auto max-w-3xl space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className={`overflow-hidden`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        {message.role === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {message.role === "user" ? "You" : "FarmAI"}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="mt-1">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {messages.length === 0 && (
                <div className="flex w-full h-full items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Start a conversation with FarmAI
                  </p>
                </div>
              )}
              {isLoading && (
                <Card className="mr-12 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">FarmAI</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="mt-2 flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="fixed bottom-0 w-full border-t bg-white dark:bg-gray-900 p-4 shadow-lg">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-end gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex min-h-[60px] items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      {selectedLanguage}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {languages.map((language) => (
                      <DropdownMenuItem
                        key={language}
                        onClick={() => setSelectedLanguage(language)}
                      >
                        {language}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about crops, pests, weather, soil, or market prices..."
                  className="min-h-[60px] resize-none"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={input.trim() === "" || isLoading}
                  className="h-10 w-10 rounded-full p-0 bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                This is done by technovich
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
