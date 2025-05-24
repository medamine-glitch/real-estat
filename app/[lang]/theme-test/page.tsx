"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { DirectThemeToggle } from "@/components/direct-theme-toggle"
import { ThemeDebug } from "@/components/theme-debug"

export default function ThemeTestPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Theme Testing Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Current theme: {theme}</p>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-medium mb-2">Icon Toggle:</h3>
                <ThemeToggle />
              </div>
              <div>
                <h3 className="font-medium mb-2">Direct Toggle:</h3>
                <DirectThemeToggle />
              </div>
              <div>
                <h3 className="font-medium mb-2">Manual Toggle:</h3>
                <div className="flex gap-2">
                  <Button onClick={() => setTheme("light")} variant="outline">
                    Light
                  </Button>
                  <Button onClick={() => setTheme("dark")} variant="outline">
                    Dark
                  </Button>
                  <Button onClick={() => setTheme("system")} variant="outline">
                    System
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Appearance Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>This text should change color based on the theme.</p>
              <div className="p-4 bg-card border border-border rounded-md">This is a card background</div>
              <div className="p-4 bg-primary text-primary-foreground rounded-md">This is primary color</div>
              <div className="p-4 bg-secondary text-secondary-foreground rounded-md">This is secondary color</div>
              <div className="p-4 bg-accent text-accent-foreground rounded-md">This is accent color</div>
              <div className="p-4 bg-muted text-muted-foreground rounded-md">This is muted color</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ThemeDebug />
    </div>
  )
}
