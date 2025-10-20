"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"
import { TrendingUp, Clock, Activity } from "lucide-react"

// Mock data generators
const generateTimeSeriesData = (points: number, baseValue: number, variance: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}:00`,
    value: baseValue + (Math.random() - 0.5) * variance,
  }))
}

const generateSuccessRateData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    successRate: 85 + Math.random() * 12,
    failureRate: 3 + Math.random() * 5,
  }))
}

const generateLatencyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    preconfirm: 20 + Math.random() * 30,
    finalize: 400 + Math.random() * 200,
  }))
}

const generateFeeData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    avgFee: 0.0003 + Math.random() * 0.0004,
    p95Fee: 0.0005 + Math.random() * 0.0005,
  }))
}

export default function AnalyticsPage() {
  const { locale } = useLocale()
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h")

  const successRateData = generateSuccessRateData()
  const latencyData = generateLatencyData()
  const feeData = generateFeeData()
  const predictabilityData = generateTimeSeriesData(24, 90, 10)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t(locale, "analytics")}</h1>
          <p className="text-muted-foreground mt-2">{t(locale, "analyticsDescription")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant={timeRange === "24h" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("24h")}>
            {t(locale, "24hours")}
          </Button>
          <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
            {t(locale, "7days")}
          </Button>
          <Button variant={timeRange === "30d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("30d")}>
            {t(locale, "30days")}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "avgSuccessRate")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94.2%</div>
            <p className="text-xs text-success mt-1">+2.1% {t(locale, "fromLastPeriod")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "avgPreconfirm")}</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">32ms</div>
            <p className="text-xs text-destructive mt-1">+5ms {t(locale, "fromLastPeriod")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "avgFee")}</CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0.00048</div>
            <p className="text-xs text-success mt-1">-12% {t(locale, "fromLastPeriod")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t(locale, "totalTransactions")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12.4K</div>
            <p className="text-xs text-success mt-1">+18% {t(locale, "fromLastPeriod")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="success" className="space-y-4">
        <TabsList>
          <TabsTrigger value="success">{t(locale, "successRate")}</TabsTrigger>
          <TabsTrigger value="latency">{t(locale, "latency")}</TabsTrigger>
          <TabsTrigger value="fees">{t(locale, "fees")}</TabsTrigger>
          <TabsTrigger value="predictability">{t(locale, "predictability")}</TabsTrigger>
        </TabsList>

        <TabsContent value="success" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t(locale, "successRate")}</CardTitle>
              <CardDescription>{t(locale, "transactionSuccessOverTime")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  successRate: {
                    label: t(locale, "successRate"),
                    color: "hsl(var(--success))",
                  },
                  failureRate: {
                    label: t(locale, "failureRate"),
                    color: "hsl(var(--destructive))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={successRateData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" className="text-xs" />
                    <YAxis className="text-xs" domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <defs>
                      <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="failureGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="successRate"
                      stroke="#22c55e"
                      fill="url(#successGradient)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="failureRate"
                      stroke="#ef4444"
                      fill="url(#failureGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="latency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t(locale, "latencyMetrics")}</CardTitle>
              <CardDescription>{t(locale, "preconfirmFinalizeLatency")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  preconfirm: {
                    label: t(locale, "preconfirm"),
                    color: "hsl(var(--primary))",
                  },
                  finalize: {
                    label: t(locale, "finalize"),
                    color: "hsl(var(--warning))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="preconfirm"
                      stroke="#a78bfa"
                      strokeWidth={3}
                      dot={{ fill: "#a78bfa", r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="finalize"
                      stroke="#fbbf24"
                      strokeWidth={3}
                      dot={{ fill: "#fbbf24", r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t(locale, "feeAnalysis")}</CardTitle>
              <CardDescription>{t(locale, "averageP95Fees")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgFee: {
                    label: t(locale, "avgFee"),
                    color: "hsl(var(--primary))",
                  },
                  p95Fee: {
                    label: t(locale, "p95Fee"),
                    color: "hsl(var(--warning))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={feeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="avgFee" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="p95Fee" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t(locale, "predictabilityTrend")}</CardTitle>
              <CardDescription>{t(locale, "networkPredictabilityOverTime")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: t(locale, "predictabilityScore"),
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={predictabilityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" domain={[70, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <defs>
                      <linearGradient id="predictGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="url(#predictGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
