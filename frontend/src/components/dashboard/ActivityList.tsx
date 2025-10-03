import { ReactElement } from "react";
import { Clock, LogIn, Monitor, UserPlus, Wrench } from "lucide-react";

export type ActivityItem = {
  icon: ReactElement;
  title: string;
  description: string;
  time: string;
};

export default function ActivityList({ items }: { items: ActivityItem[] }): ReactElement {
  return (
    <ul className="space-y-3">
      {items.map((it, idx) => (
        <li key={idx} className="flex items-start gap-3 rounded-lg p-3 bg-slate-300 shadow hover:shadow-lg transition">
          <div className="text-slate-500">{it.icon}</div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 line-clamp-1">{it.title}</p>
            <p className="text-xs text-slate-700 line-clamp-2">{it.description}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-xs text-slate-600">
            <Clock className="h-3.5 w-3.5" />
            {it.time}
          </div>
        </li>
      ))}
    </ul>
  );
}

export const ActivityIcons = { LogIn, Monitor, UserPlus, Wrench };
