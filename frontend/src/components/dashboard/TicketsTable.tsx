import { ReactElement } from "react";

type Ticket = {
  id: number;
  subject: string;
  requester: string;
  status: "Nouveau" | "En cours" | "En attente" | "Résolu";
  priority: "Basse" | "Moyenne" | "Haute" | "Urgente";
  updatedAt: string;
};

const badge = (status: Ticket["status"]) => {
  const map: Record<Ticket["status"], string> = {
    Nouveau: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
    "En cours": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-100",
    "En attente": "bg-slate-200 text-slate-700 dark:bg-slate-800/50 dark:text-slate-200",
    Résolu: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200",
  };
  return map[status];
};

const prio = (p: Ticket["priority"]) => {
  const map: Record<Ticket["priority"], string> = {
    Basse: "text-slate-500",
    Moyenne: "text-amber-600",
    Haute: "text-orange-600",
    Urgente: "text-red-600 font-semibold",
  };
  return map[p];
};

export default function TicketsTable({ data }: { data: Ticket[] }): ReactElement {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white/70 to-white/30 dark:from-slate-900/40 dark:to-slate-900/10 backdrop-blur-sm shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset]">
      <table className="w-full text-sm">
        <thead className="text-slate-600 dark:text-slate-300">
          <tr className="border-b border-slate-200/70 dark:border-slate-800/70 bg-slate-50/60 dark:bg-slate-900/20">
            <th className="text-left px-4 py-3 font-semibold">Ticket</th>
            <th className="text-left px-4 py-3 font-semibold">Demandeur</th>
            <th className="text-left px-4 py-3 font-semibold">Statut</th>
            <th className="text-left px-4 py-3 font-semibold">Priorité</th>
            <th className="text-left px-4 py-3 font-semibold">MAJ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr
              key={t.id}
              className={
                (i % 2 ? "bg-slate-50/40 dark:bg-slate-900/10 " : "") +
                "hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
              }
            >
              <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">#{t.id} • {t.subject}</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{t.requester}</td>
              <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs ${badge(t.status)}`}>{t.status}</span></td>
              <td className={`px-4 py-3 ${prio(t.priority)}`}>{t.priority}</td>
              <td className="px-4 py-3 text-slate-500">{t.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
