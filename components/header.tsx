"use client"

import { Globe, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { useState, useEffect } from "react"

export function Header() {
  const { locale, setLocale } = useLocale()
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString(locale === "ja" ? "ja-JP" : "en-US"))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [locale])

  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-semibold text-foreground">{t(locale, "productName")}</h1>

          <Select defaultValue="prod">
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dev">{t(locale, "dev")}</SelectItem>
              <SelectItem value="prod">{t(locale, "prod")}</SelectItem>
              <SelectItem value="mock">{t(locale, "mock")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground font-mono">
            {currentTime}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setLocale(locale === "en" ? "ja" : "en")}
          >
            <Globe className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
