"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { date: "Feb 1", audits: 12, issues: 28 },
  { date: "Feb 5", audits: 19, issues: 35 },
  { date: "Feb 10", audits: 15, issues: 29 },
  { date: "Feb 15", audits: 22, issues: 41 },
  { date: "Feb 20", audits: 28, issues: 52 },
  { date: "Feb 25", audits: 24, issues: 49 },
  { date: "Mar 1", audits: 31, issues: 58 },
  { date: "Mar 5", audits: 35, issues: 62 },
]

export function AuditActivityChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend />
          <Line type="monotone" dataKey="audits" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} strokeWidth={2} />
          <Line type="monotone" dataKey="issues" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

