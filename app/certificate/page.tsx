"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, CheckCircle2, Calendar, Clock } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"

interface CertificateData {
  projectName: string
  dateRange: string
  totalTransactions: number
  successRate: number
  avgPreconfirm: number
  avgFinalize: number
  avgFee: number
  predictabilityScore: number
}

export default function CertificatePage() {
  const { locale } = useLocale()
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [certificate, setCertificate] = useState<CertificateData | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate certificate generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockCertificate: CertificateData = {
      projectName: projectName || "Unnamed Project",
      dateRange: `${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(locale)} - ${new Date().toLocaleDateString(locale)}`,
      totalTransactions: Math.floor(10000 + Math.random() * 5000),
      successRate: 92 + Math.random() * 6,
      avgPreconfirm: 25 + Math.random() * 15,
      avgFinalize: 420 + Math.random() * 180,
      avgFee: 0.00042 + Math.random() * 0.0002,
      predictabilityScore: 88 + Math.random() * 8,
    }

    setCertificate(mockCertificate)
    setIsGenerating(false)
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert(t(locale, "downloadStarted"))
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t(locale, "certificate")}</h1>
        <p className="text-muted-foreground mt-2">{t(locale, "certificateDescription")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle>{t(locale, "certificateConfig")}</CardTitle>
            <CardDescription>{t(locale, "enterProjectDetails")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">{t(locale, "projectName")}</Label>
              <Input
                id="project-name"
                placeholder={t(locale, "enterProjectName")}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t(locale, "description")}</Label>
              <Textarea
                id="description"
                placeholder={t(locale, "enterDescription")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>{t(locale, "reportPeriod")}</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  {t(locale, "last7Days")}
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  {t(locale, "last30Days")}
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  {t(locale, "custom")}
                </Button>
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
              {isGenerating ? (
                <>
                  <FileText className="mr-2 h-4 w-4 animate-pulse" />
                  {t(locale, "generating")}
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  {t(locale, "generateCertificate")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card>
          <CardHeader>
            <CardTitle>{t(locale, "certificatePreview")}</CardTitle>
            <CardDescription>{t(locale, "previewBeforeDownload")}</CardDescription>
          </CardHeader>
          <CardContent>
            {!certificate ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">{t(locale, "generateToPreview")}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Certificate Header */}
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <h3 className="text-lg font-semibold text-foreground">{t(locale, "performanceCertificate")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{t(locale, "raikuNetworkMonitor")}</p>
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{t(locale, "projectName")}</p>
                    <p className="font-semibold text-foreground">{certificate.projectName}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{certificate.dateRange}</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">{t(locale, "totalTransactions")}</p>
                    <p className="text-lg font-bold text-foreground">
                      {certificate.totalTransactions.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">{t(locale, "successRate")}</p>
                    <p className="text-lg font-bold text-success">{certificate.successRate.toFixed(1)}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">{t(locale, "avgPreconfirm")}</p>
                    <p className="text-lg font-bold text-foreground">{certificate.avgPreconfirm.toFixed(0)}ms</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">{t(locale, "avgFinalize")}</p>
                    <p className="text-lg font-bold text-foreground">{certificate.avgFinalize.toFixed(0)}ms</p>
                  </div>
                </div>

                {/* Predictability Score */}
                <div className="p-4 rounded-lg border bg-primary/5 border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">{t(locale, "predictabilityScore")}</p>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {t(locale, "excellent")}
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold text-primary">{certificate.predictabilityScore.toFixed(1)}%</p>
                </div>

                {/* Download Button */}
                <Button onClick={handleDownload} className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  {t(locale, "downloadPDF")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{t(locale, "detailedReports")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t(locale, "detailedReportsDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="rounded-full bg-success/10 p-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <CardTitle className="text-base">{t(locale, "verifiedMetrics")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t(locale, "verifiedMetricsDesc")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="rounded-full bg-warning/10 p-2">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <CardTitle className="text-base">{t(locale, "instantGeneration")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t(locale, "instantGenerationDesc")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
