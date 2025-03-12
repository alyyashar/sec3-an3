"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Shield } from "lucide-react"

export function RiskScoreCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Security Score</CardTitle>
        <Shield className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-orange-500">72/100</div>
        <div className="mt-2">
          <Progress value={72} className="h-2" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Medium risk level</p>
      </CardContent>
    </Card>
  )
}

