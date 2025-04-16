"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, CheckCircle, Clock, FileText, Upload } from "lucide-react"

const timelineItems = [
  {
    id: 1,
    type: "upload",
    title: "GovernanceToken.sol uploaded",
    time: "2 hours ago",
    icon: <Upload className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "scan",
    title: "Toolchain scan completed",
    time: "1 hour ago",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "issue",
    title: "3 Critical issues detected",
    time: "45 minutes ago",
    icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
  },
  {
    id: 4,
    type: "report",
    title: "Preliminary report generated",
    time: "30 minutes ago",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 5,
    type: "fix",
    title: "Auto-patch suggestions ready",
    time: "15 minutes ago",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
]

export function AuditTimeline(audits : any) {
  return (
    <div className="space-y-8">
      {timelineItems.map((item) => (
        <div key={item.id} className="flex items-start space-x-4">
          <Avatar className="h-8 w-8 bg-secondary">
            <AvatarFallback className="bg-secondary text-secondary-foreground">{item.icon}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

