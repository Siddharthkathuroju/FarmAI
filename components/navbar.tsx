"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, LineChart, Menu, TreesIcon as Plant, Sprout, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="hidden font-bold sm:inline-block">FarmAI</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-4 py-2 h-auto">
                  Features <span className="ml-1">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/chat" className="flex items-center">
                    <Sprout className="mr-2 h-4 w-4" />
                    <span>Crop Advisor</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/suggestions" className="flex items-center">
                    <Plant className="mr-2 h-4 w-4" />
                    <span>Pest Management</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/market-analysis" className="flex items-center">
                    <LineChart className="mr-2 h-4 w-4" />
                    <span>Market Insights</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/pricing"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/pricing" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/about" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Link href="/chat">
              <Button variant="default" size="sm" className="px-4">
                Try FarmAI
              </Button>
            </Link>
          </nav>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container py-2">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/chat"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Crop Advisor
              </Link>
              <Link
                href="/suggestions"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pest Management
              </Link>
              <Link
                href="/market-analysis"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Market Insights
              </Link>
              <Link
                href="/pricing"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-foreground/60 transition-colors hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

