"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, Code, RefreshCw, Shield } from "lucide-react"

export function VerificationStatus() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Verification Progress: 40%</h3>
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            In Progress
          </Badge>
        </div>
        <Progress value={40} className="h-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Fixed Issues</h4>
                <p className="text-sm text-muted-foreground">3 of 7 issues fixed</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Critical Issues</span>
                <span className="text-sm">1/2</span>
              </div>
              <Progress value={50} className="h-1.5" />

              <div className="flex justify-between items-center">
                <span className="text-sm">High Issues</span>
                <span className="text-sm">2/3</span>
              </div>
              <Progress value={67} className="h-1.5" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Medium Issues</span>
                <span className="text-sm">0/2</span>
              </div>
              <Progress value={0} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <RefreshCw className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium">Re-audit Status</h4>
                <p className="text-sm text-muted-foreground">Verification in progress</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Code changes detected</span>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Complete
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">AI verification</span>
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  In Progress
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Final security score</span>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Auto-Fix Verification</h3>

          <div className="space-y-4">
            <div className="p-3 border rounded-md bg-green-500/5 border-green-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">Reentrancy Fix</h4>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Verified
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                The reentrancy vulnerability has been successfully fixed by implementing the checks-effects-interactions
                pattern.
              </p>
            </div>

            <div className="p-3 border rounded-md bg-green-500/5 border-green-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">Unchecked Return Value Fix</h4>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Verified
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                The unchecked return value vulnerability has been fixed by properly checking the return value before
                updating state.
              </p>
            </div>

            <div className="p-3 border rounded-md bg-yellow-500/5 border-yellow-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <h4 className="font-medium">Integer Overflow Fix</h4>
                </div>
                <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                  Partial
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                SafeMath implementation added but additional validation needed for extreme values.
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                <Code className="mr-2 h-3 w-3" />
                View Suggested Improvements
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Re-run Verification
        </Button>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Generate Security Report
        </Button>
      </div>
    </div>
  )
}

