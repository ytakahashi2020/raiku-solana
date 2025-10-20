"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Play, RefreshCw, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"

interface SimulationResult {
  success: boolean
  preconfirmTime: number
  finalizeTime: number
  fee: number
  predictability: number
}

export default function SimulatorPage() {
  const { locale } = useLocale()
  const [txSize, setTxSize] = useState(250)
  const [priority, setPriority] = useState(50)
  const [isSimulating, setIsSimulating] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)

  const handleSimulate = async () => {
    setIsSimulating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock simulation result
    const mockResult: SimulationResult = {
      success: Math.random() > 0.1,
      preconfirmTime: Math.floor(20 + Math.random() * 50),
      finalizeTime: Math.floor(400 + Math.random() * 200),
      fee: 0.0003 + (priority / 100) * 0.0005,
      predictability: 85 + Math.random() * 10,
    }

    setResult(mockResult)
    setIsSimulating(false)
  }

  const handleReset = () => {
    setResult(null)
    setTxSize(250)
    setPriority(50)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t(locale, "simulator")}</h1>
        <p className="text-muted-foreground mt-2">{t(locale, "simulatorDescription")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle>{t(locale, "transactionConfig")}</CardTitle>
            <CardDescription>{t(locale, "configureSimulation")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transaction Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="tx-size">{t(locale, "transactionSize")}</Label>
                <span className="text-sm font-medium text-foreground">{txSize} bytes</span>
              </div>
              <Slider
                id="tx-size"
                min={100}
                max={1000}
                step={50}
                value={[txSize]}
                onValueChange={(value) => setTxSize(value[0])}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">{t(locale, "typicalRange")}: 200-500 bytes</p>
            </div>

            {/* Priority Level */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="priority">{t(locale, "priorityLevel")}</Label>
                <Badge variant={priority > 70 ? "default" : priority > 40 ? "secondary" : "outline"}>
                  {priority > 70 ? t(locale, "high") : priority > 40 ? t(locale, "medium") : t(locale, "low")}
                </Badge>
              </div>
              <Slider
                id="priority"
                min={0}
                max={100}
                step={10}
                value={[priority]}
                onValueChange={(value) => setPriority(value[0])}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">{t(locale, "higherPriority")}</p>
            </div>

            {/* Estimated Fee */}
            <div className="space-y-2">
              <Label>{t(locale, "estimatedFee")}</Label>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {(0.0003 + (priority / 100) * 0.0005).toFixed(6)}
                </span>
                <span className="text-sm text-muted-foreground">{t(locale, "sol")}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSimulate} disabled={isSimulating} className="flex-1" size="lg">
                {isSimulating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    {t(locale, "simulating")}
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    {t(locale, "runSimulation")}
                  </>
                )}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                {t(locale, "reset")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card>
          <CardHeader>
            <CardTitle>{t(locale, "simulationResults")}</CardTitle>
            <CardDescription>{t(locale, "predictedOutcome")}</CardDescription>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Play className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">{t(locale, "runSimulationPrompt")}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Success Status */}
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                  {result.success ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{t(locale, "transactionSuccess")}</p>
                        <p className="text-sm text-muted-foreground">{t(locale, "likelyToLand")}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{t(locale, "transactionFailed")}</p>
                        <p className="text-sm text-muted-foreground">{t(locale, "mayNotLand")}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{t(locale, "preconfirmTime")}</span>
                    </div>
                    <span className="font-semibold text-foreground">{result.preconfirmTime}ms</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{t(locale, "finalizeTime")}</span>
                    </div>
                    <span className="font-semibold text-foreground">{result.finalizeTime}ms</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground">{t(locale, "actualFee")}</span>
                    <span className="font-semibold text-foreground">
                      {result.fee.toFixed(6)} {t(locale, "sol")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground">{t(locale, "predictabilityScore")}</span>
                    <span className="font-semibold text-foreground">{result.predictability.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
                  <p className="text-sm font-medium text-foreground mb-2">{t(locale, "recommendation")}</p>
                  <p className="text-sm text-muted-foreground">
                    {result.success ? t(locale, "goodConditions") : t(locale, "considerIncreasing")}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
