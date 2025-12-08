import { ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  percentageChange?: number;
  prefix?: string;
}

export function StatsCard({
  title,
  value = 0,
  percentageChange,
  prefix = "",
}: StatsCardProps) {
  return (
    <Card className="bg-white shadow-sm border-0">
      <CardContent className="p-6">
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">
          {prefix}
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {percentageChange && (
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <ArrowUp className="h-4 w-4" />
            <span>+ {percentageChange}% from the last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
