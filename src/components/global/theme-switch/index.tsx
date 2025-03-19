"use client"

import React from "react"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"

import {
  AnimationStart,
  AnimationVariant,
  createAnimation,
} from "@/provider/theme-animation"

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant
  start?: AnimationStart
  showLabel?: boolean
  url?: string
}

export default function ThemeSwitcher({
  variant = "circle-blur",
  start = "top-left",
  showLabel = false,
  url = "",
}: ThemeToggleAnimationProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const styleId = "theme-transition-styles"

  const updateStyles = React.useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return

    let styleElement = document.getElementById(styleId) as HTMLStyleElement

    console.log("style ELement", styleElement)
    console.log("name", name)

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css
  }, [])

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, url)

    updateStyles(animation.css, animation.name)

    if (typeof window === "undefined") return

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light")
    }

    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    document.startViewTransition(switchTheme)
  }, [theme, setTheme])

  return (
    <div className="relative inline-grid h-7 grid-cols-[1fr_1fr] items-center text-sm font-medium">
    <Label htmlFor="switch-12" className="sr-only">
      Labeled switch
    </Label>
    <Switch
      id="switch-12"
      checked={resolvedTheme === "dark"}
      onCheckedChange={toggleTheme}
      className="peer absolute inset-0 h-[inherit] w-auto data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
    />
    <span className="pointer-events-none relative ms-0.5 flex min-w-6 items-center justify-center text-center peer-data-[state=checked]:text-muted-foreground/70">
      <Sun size={16} strokeWidth={2} aria-hidden="true" />
    </span>
    <span className="pointer-events-none relative me-0.5 flex min-w-6 items-center justify-center text-center peer-data-[state=unchecked]:text-muted-foreground/70">
      <Moon size={16} strokeWidth={2} aria-hidden="true" />
    </span>
  </div>
  )
}
