"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { useState } from "react"
import type { RevenueData } from "@/lib/types"

interface RevenueChartProps {
  data: RevenueData[]
}

const monthOptions = [
  { value: "all", label: "All Months" },
  { value: "q1", label: "Q1" },
  { value: "q2", label: "Q2" },
  { value: "q3", label: "Q3" },
  { value: "q4", label: "Q4" },
]

export function RevenueChart({ data }: RevenueChartProps) {
  const [selectedMonth, setSelectedMonth] = useState("all")

  return (
    <Card className="bg-white shadow-sm border-0">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
          <CardDescription>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</CardDescription>
        </div>
        <FilterDropdown
          value={selectedMonth}
          onChange={setSelectedMonth}
          options={monthOptions}
          placeholder="Select Month"
        />
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
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
              <Bar dataKey="orders" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
