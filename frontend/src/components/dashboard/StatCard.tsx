import { ReactElement } from "react";

type Props = {
  title: string;
  value: string | number;
  trend?: { value: number; label?: string; direction?: "up" | "down" };
  icon?: ReactElement;
  accent?: "blue" | "green" | "orange" | "red" | "slate";
};

export default function StatCard({ title, value, trend, icon }: Props): ReactElement {
  return (
    <div className="p-6 bg-slate-300 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-slate-700">{title}</p>
        {icon && <div className="text-slate-700">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-3xl font-bold">{value}</span>
        {trend && (
          <span
            className={
              "text-[11px] font-semibold px-2 py-0.5 rounded-full border " +
              (trend.direction === "down"
                ? "bg-red-50 text-red-700 border-red-200/70"
                : "bg-emerald-50 text-emerald-700 border-emerald-200/70")
            }
            aria-label={trend.label ?? "Variation"}
          >
            {trend.direction === "down" ? "\u25bc" : "\u25b2"} {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
}
