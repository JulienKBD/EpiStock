import { ReactElement, ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  number: string;
  icon: ReactNode;
}

export default function DashboardCard({
  title,
  number,
  icon,
}: DashboardCardProps): ReactElement {
  return (
    <div className="p-6 bg-slate-300 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{number}</p>
    </div>
  );
}
