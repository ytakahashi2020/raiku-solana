"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import Link from "next/link"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

// Mock data
const mockSparklineData = Array.from({ length: 30 }, (_, i) => ({
  value: 0.85 + Math.random() * 0.15,
}))

export default function HomePage() {
  const { locale } = useLocale()

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Predictability Score Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t(locale, "predictabilityScore")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-6xl font-bold text-foreground">92%</div>
              <p className="text-sm text-muted-foreground mt-2">{t(locale, "estimatedSuccess", { window: "2s" })}</p>
            </div>
            <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
              {t(locale, "mediumCongestion")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t(locale, "landingRate", { window: "2s" })}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">97.2%</div>
            <div className="h-16 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockSparklineData}>
                  <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--success))"
                    fill="url(#gradient1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "medianPreconfirm")}</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">28ms</div>
            <p className="text-xs text-muted-foreground mt-2">p95: 70ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "suggestedFee")}</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">0.00041</div>
            <p className="text-xs text-muted-foreground mt-2">{t(locale, "sol")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Panel */}
      <div className="flex gap-4">
        <Link href="/simulator" className="flex-1">
          <Button className="w-full h-12" size="lg">
            {t(locale, "goToSimulator")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/certificate" className="flex-1">
          <Button variant="outline" className="w-full h-12 bg-transparent" size="lg">
            {t(locale, "generateCertificate")}
          </Button>
        </Link>
      </div>
    </div>
  )
}
