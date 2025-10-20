"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Clock, Pause, Play, Filter } from "lucide-react"
import { useLocale } from "@/lib/locale-context"
import { t } from "@/lib/i18n"

interface Transaction {
  id: string
  signature: string
  status: "pending" | "preconfirmed" | "finalized" | "failed"
  timestamp: number
  preconfirmTime?: number
  finalizeTime?: number
  fee: number
  size: number
}

export default function LiveTransactionsPage() {
  const { locale } = useLocale()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [filter, setFilter] = useState<"all" | "pending" | "success" | "failed">("all")

  // Simulate live transaction feed
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(
      () => {
        const newTx: Transaction = {
          id: Math.random().toString(36).substring(7),
          signature: `${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
          status: "pending",
          timestamp: Date.now(),
          fee: 0.0003 + Math.random() * 0.0005,
          size: 200 + Math.floor(Math.random() * 300),
        }

        setTransactions((prev) => [newTx, ...prev.slice(0, 49)])

        // Simulate status updates
        setTimeout(
          () => {
            setTransactions((prev) =>
              prev.map((tx) =>
                tx.id === newTx.id
                  ? {
                      ...tx,
                      status: Math.random() > 0.1 ? "preconfirmed" : "failed",
                      preconfirmTime: Math.floor(20 + Math.random() * 50),
                    }
                  : tx,
              ),
            )
          },
          500 + Math.random() * 1000,
        )

        setTimeout(
          () => {
            setTransactions((prev) =>
              prev.map((tx) =>
                tx.id === newTx.id && tx.status === "preconfirmed"
                  ? {
                      ...tx,
                      status: "finalized",
                      finalizeTime: Math.floor(400 + Math.random() * 200),
                    }
                  : tx,
              ),
            )
          },
          2000 + Math.random() * 2000,
        )
      },
      2000 + Math.random() * 1000,
    )

    return () => clearInterval(interval)
  }, [isPaused])

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true
    if (filter === "pending") return tx.status === "pending" || tx.status === "preconfirmed"
    if (filter === "success") return tx.status === "finalized"
    if (filter === "failed") return tx.status === "failed"
    return true
  })

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-muted/50">
            <Clock className="mr-1 h-3 w-3" />
            {t(locale, "pending")}
          </Badge>
        )
      case "preconfirmed":
        return (
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            <Clock className="mr-1 h-3 w-3" />
            {t(locale, "preconfirmed")}
          </Badge>
        )
      case "finalized":
        return (
          <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            {t(locale, "finalized")}
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="secondary" className="bg-destructive/20 text-destructive border-destructive/30">
            <XCircle className="mr-1 h-3 w-3" />
            {t(locale, "failed")}
          </Badge>
        )
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t(locale, "liveTransactions")}</h1>
          <p className="text-muted-foreground mt-2">{t(locale, "liveTransactionsDescription")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                {t(locale, "resume")}
              </>
            ) : (
              <>
                <Pause className="mr-2 h-4 w-4" />
                {t(locale, "pause")}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "total")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{transactions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "pending")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {transactions.filter((tx) => tx.status === "pending" || tx.status === "preconfirmed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "finalized")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {transactions.filter((tx) => tx.status === "finalized").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t(locale, "failed")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {transactions.filter((tx) => tx.status === "failed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          {t(locale, "all")}
        </Button>
        <Button variant={filter === "pending" ? "default" : "outline"} size="sm" onClick={() => setFilter("pending")}>
          {t(locale, "pending")}
        </Button>
        <Button variant={filter === "success" ? "default" : "outline"} size="sm" onClick={() => setFilter("success")}>
          {t(locale, "success")}
        </Button>
        <Button variant={filter === "failed" ? "default" : "outline"} size="sm" onClick={() => setFilter("failed")}>
          {t(locale, "failed")}
        </Button>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>{t(locale, "recentTransactions")}</CardTitle>
          <CardDescription>
            {t(locale, "showing")} {filteredTransactions.length} {t(locale, "transactions")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">{t(locale, "noTransactions")}</div>
            ) : (
              filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusBadge(tx.status)}
                      <code className="text-sm font-mono text-muted-foreground truncate">{tx.signature}</code>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        {t(locale, "size")}: {tx.size}B
                      </span>
                      <span>
                        {t(locale, "fee")}: {tx.fee.toFixed(6)} {t(locale, "sol")}
                      </span>
                      {tx.preconfirmTime && (
                        <span>
                          {t(locale, "preconfirm")}: {tx.preconfirmTime}ms
                        </span>
                      )}
                      {tx.finalizeTime && (
                        <span>
                          {t(locale, "finalize")}: {tx.finalizeTime}ms
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground ml-4">
                    {new Date(tx.timestamp).toLocaleTimeString(locale)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
