"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useRevenueData } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function RevenueChart() {
  const { revenueData, isLoading } = useRevenueData();
  // console.log(revenueData);
  if (isLoading) {
    return <Skeleton className="h-[400px] rounded-xl" />;
  }

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
          <CardDescription>Monthly revenue overview</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`$${value}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
