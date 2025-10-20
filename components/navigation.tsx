"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Zap, Activity, BarChart3, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"

const navItems = [
  { href: "/", icon: Home, labelKey: "home" },
  { href: "/simulator", icon: Zap, labelKey: "simulator" },
  { href: "/live", icon: Activity, labelKey: "liveTransactions" },
  { href: "/analytics", icon: BarChart3, labelKey: "analytics" },
  { href: "/certificate", icon: FileText, labelKey: "certificate" },
]

export function Navigation() {
  const pathname = usePathname()
  const { locale } = useLocale()

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center gap-1 px-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {t(locale, item.labelKey)}
              {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
