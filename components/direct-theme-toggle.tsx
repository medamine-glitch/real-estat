"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function DirectThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex gap-2">
      <Button onClick={() => setTheme("light")} variant="outline" size="sm">
        Light
      </Button>
      <Button onClick={() => setTheme("dark")} variant="outline" size="sm">
        Dark
      </Button>
    </div>
  )
}
