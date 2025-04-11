"use client"
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalAmountLost = () => {
  const [totalLost, setTotalLost] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [quarterlyData, setQuarterlyData] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const fetchTotalLost = async () => {
      try {
        const response = await fetch("https://api.llama.fi/hacks");
        const data = await response.json();

        // Process and set up the quarterly data as before
        const now = new Date();
        const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

        const quarters: number[] = [0, 0, 0, 0];
        let total = 0;

        const hacksArray = Array.isArray(data) ? data : (data && Array.isArray(data.hacks) ? data.hacks : []);
        hacksArray.forEach((hack: any) => {
          if (!hack.date) return;

          const hackDate = typeof hack.date === 'number'
            ? new Date(hack.date * 1000)
            : new Date(hack.date);

          if (hackDate >= oneYearAgo && hackDate <= now) {
            const amount = parseFloat(hack.amount) || 0;
            total += amount;

            const monthsAgo = Math.floor((now.getTime() - hackDate.getTime()) / (30 * 24 * 60 * 60 * 1000));
            const quarterIndex = Math.min(Math.floor(monthsAgo / 3), 3);
            quarters[quarterIndex] += amount;
          }
        });

        setTotalLost(total);
        setQuarterlyData(quarters);
      } catch (error) {
        console.error("Error fetching total amount lost:", error);
        setTotalLost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalLost();
  }, []);

  // Prepare data for Bar Chart
  const chartData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Amount Lost ($)",
        data: quarterlyData,
        backgroundColor: ["#4ee2b5"],  // Colors for the bars
        borderColor: ["#4ee2b5"],
        borderWidth: 1
      }
    ]
  };

  return (
    <Card className="border-none rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <DollarSign className="h-5 w-5 text-red-400" />
          Total Amount Lost in Web3 Hacks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-400 mb-3">
          Aggregates total monetary losses from recent security breaches.
        </p>
        <div className="flex flex-col items-center justify-center py-4">
          {loading ? (
            <div className="text-lg text-gray-400">Loading...</div>
          ) : (
            <>
              <div className="text-4xl font-bold text-red-400">
                {totalLost ? `$${totalLost.toLocaleString()}` : "No data available"}
              </div>
              <div className="text-sm text-zinc-400 mt-1">Lost in the last 12 months</div>
              <div className="w-3/4 content-center">                
              <Bar data={chartData} />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalAmountLost;
