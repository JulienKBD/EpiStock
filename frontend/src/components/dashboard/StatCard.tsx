import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  value: string | number;
  trend?: { value: number; label?: string; direction?: "up" | "down" };
  icon?: ReactElement;
  accent?: "blue" | "green" | "orange" | "red" | "slate";
};

export default function StatCard({ title, value, trend, icon, accent = "slate" }: Props): ReactElement {
  const accents: Record<NonNullable<Props["accent"]>, string> = {
    blue: "border-blue-200 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/30",
    green: "border-green-200 bg-green-50/60 dark:border-green-900 dark:bg-green-950/30",
    orange: "border-orange-200 bg-orange-50/60 dark:border-orange-900 dark:bg-orange-950/30",
    red: "border-red-200 bg-red-50/60 dark:border-red-900 dark:bg-red-950/30",
    slate: "border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/30",
  };

  return (
    <Card className={`${accents[accent]} overflow-hidden`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-slate-500">{title}</CardTitle>
        {icon && <div className="text-slate-400">{icon}</div>}
      </CardHeader>
      <CardContent className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold">{value}</span>
        {trend && (
          <span
            className={
              "text-xs font-medium px-2 py-0.5 rounded-full " +
              (trend.direction === "down"
                ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200"
                : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200")
            }
            aria-label={trend.label ?? "Variation"}
          >
            {trend.direction === "down" ? "▼" : "▲"} {trend.value}%
          </span>
        )}
      </CardContent>
    </Card>
  );
}
