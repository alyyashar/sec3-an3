'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield } from 'lucide-react';

export function RiskScoreCard({ score = 72 }: { score?: number }) {
  const getRiskLevel = (score: number) => {
    if (score >= 85) return 'Low risk level';
    if (score >= 60) return 'Medium risk level';
    return 'High risk level';
  };

  const getColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Security Score</CardTitle>
        <Shield className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getColor(score)}`}>{score}/100</div>
        <div className="mt-2">
          <Progress value={score} className="h-2" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{getRiskLevel(score)}</p>
      </CardContent>
    </Card>
  );
}
