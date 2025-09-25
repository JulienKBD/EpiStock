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
  const accents: Record<NonNullable<Props["accent"]>, { card: string; chip: string; text: string }> = {
    blue: {
      card:
        "border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white/70 to-white/30 dark:from-slate-900/40 dark:to-slate-900/10",
      chip: "from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-300",
      text: "text-blue-600 dark:text-blue-300",
    },
    green: {
      card:
        "border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white/70 to-white/30 dark:from-slate-900/40 dark:to-slate-900/10",
      chip: "from-green-500/20 to-green-500/5 text-green-600 dark:text-green-300",
      text: "text-green-600 dark:text-green-300",
    },
    orange: {
      card:
        "border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white/70 to-white/30 dark:from-slate-900/40 dark:to-slate-900/10",
      chip: "from-orange-500/20 to-orange-500/5 text-orange-600 dark:text-orange-300",
      text: "text-orange-600 dark:text-orange-300",
    },
    red: {
      card:
        "border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white/70 to-white/30 dark:from-slate-900/40 dark:to-slate-900/10",
      chip: "from-red-500/20 to-red-500/5 text-red-600 dark:text-red-300",
      text: "text-red-600 dark:text-red-300",
    },
    slate: {
      card:
        "border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white/70 to-white/30 dark:from-slate-900/40 dark:to-slate-900/10",
      chip: "from-slate-500/20 to-slate-500/5 text-slate-700 dark:text-slate-200",
      text: "text-slate-700 dark:text-slate-200",
    },
  };

  return (
    <Card
      className={`${accents[accent].card} overflow-hidden shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset] backdrop-blur-sm`}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xs uppercase tracking-wide text-slate-500">{title}</CardTitle>
        {icon && (
          <div
            className={`p-2 rounded-md bg-gradient-to-br ${accents[accent].chip} shadow-sm border border-white/30 dark:border-white/10`}
          >
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold">{value}</span>
        {trend && (
          <span
            className={
              "text-[11px] font-semibold px-2 py-0.5 rounded-full border " +
              (trend.direction === "down"
                ? "bg-red-50 text-red-700 border-red-200/70 dark:bg-red-900/30 dark:text-red-200 dark:border-red-900"
                : "bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-900")
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
