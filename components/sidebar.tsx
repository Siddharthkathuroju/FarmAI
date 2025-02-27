"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Leaf, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface ChatHistory {
  id: string
  title: string
  date: string
}

export function Sidebar() {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: "1", title: "Tomato disease identification", date: "Today" },
    { id: "2", title: "Corn planting schedule", date: "Today" },
    { id: "3", title: "Organic pest control methods", date: "Yesterday" },
    { id: "4", title: "Soil pH adjustment", date: "Yesterday" },
    { id: "5", title: "Wheat market prices", date: "Last week" },
    { id: "6", title: "Irrigation systems comparison", date: "Last week" },
    { id: "7", title: "Crop rotation planning", date: "Last month" },
  ])

  return (
    <div className="hidden border-r bg-gray-50/40 dark:bg-gray-900/40 w-[260px] flex-col md:flex">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/chat">
          <Button variant="outline" className="h-9 w-full justify-start gap-2">
            <Plus className="h-4 w-4" />
            New Consultation
          </Button>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="mt-4 space-y-4">
          <div className="px-2">
            <h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Recent</h2>
            <div className="space-y-1">
              {chatHistory
                .filter((chat) => chat.date === "Today")
                .map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/chat?id=${chat.id}`}
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="truncate">{chat.title}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                      <Trash className="h-3 w-3" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
          <Separator />
          <div className="px-2">
            <h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Yesterday</h2>
            <div className="space-y-1">
              {chatHistory
                .filter((chat) => chat.date === "Yesterday")
                .map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/chat?id=${chat.id}`}
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="truncate">{chat.title}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                      <Trash className="h-3 w-3" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
          <Separator />
          <div className="px-2">
            <h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Previous</h2>
            <div className="space-y-1">
              {chatHistory
                .filter((chat) => chat.date !== "Today" && chat.date !== "Yesterday")
                .map((chat) => (
                  <Link
                    key={chat.id}
                    href={`/chat?id=${chat.id}`}
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="truncate">{chat.title}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                      <Trash className="h-3 w-3" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">This is done by technovich</p>
      </div>
    </div>
  )
}

