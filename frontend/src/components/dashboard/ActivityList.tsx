import { ReactElement } from "react";
import { Clock, LogIn, Monitor, UserPlus, Wrench } from "lucide-react";

type Item = {
  icon: ReactElement;
  title: string;
  description: string;
  time: string;
};

export default function ActivityList({ items }: { items: Item[] }): ReactElement {
  return (
    <ul className="space-y-3">
      {items.map((it, idx) => (
  <li key={idx} className="flex items-start gap-3 rounded-lg border border-slate-200/80 dark:border-slate-800 p-3 bg-gradient-to-br from-white/70 to-white/30 dark:from-slate-900/40 dark:to-slate-900/10 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-900/30 transition-colors">
          <div className="text-slate-500">{it.icon}</div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 line-clamp-1">{it.title}</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{it.description}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {it.time}
          </div>
        </li>
      ))}
    </ul>
  );
}

export const ActivityIcons = { LogIn, Monitor, UserPlus, Wrench };
