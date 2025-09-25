import { ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Ticket, Monitor, Users, BarChart3, Settings } from "lucide-react";

type Item = {
  href: string;
  label: string;
  icon: ReactElement;
};

const items: Item[] = [
  { href: "/dashboard", label: "Accueil", icon: <Home className="h-4 w-4" /> },
  { href: "/materiel", label: "Matériel", icon: <Monitor className="h-4 w-4" /> },
  { href: "/tickets", label: "Tickets", icon: <Ticket className="h-4 w-4" /> },
  { href: "/users", label: "Utilisateurs", icon: <Users className="h-4 w-4" /> },
  { href: "/reports", label: "Rapports", icon: <BarChart3 className="h-4 w-4" /> },
  { href: "/admin", label: "Administration", icon: <Settings className="h-4 w-4" /> },
];

export default function Sidebar(): ReactElement {
  const router = useRouter();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 shrink-0 border-r border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white/70 to-white/30 dark:from-slate-900/40 dark:to-slate-900/10 backdrop-blur-md">
      <div className="px-4 py-3 border-b border-slate-200/70 dark:border-slate-800/70">
        <p className="text-xs uppercase tracking-wide text-slate-500">Navigation</p>
      </div>
      <nav className="p-2 space-y-1">
        {items.map((item) => {
          const active = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors border border-transparent " +
                (active
                  ? "bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-700 dark:text-blue-200 border-blue-200/60 dark:border-blue-900"
                  : "text-slate-700 hover:bg-slate-100/70 dark:text-slate-200 dark:hover:bg-slate-800/60")
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 text-xs text-slate-500 border-t border-slate-200/70 dark:border-slate-800/70">
        <p className="leading-relaxed">
          EpiStock • Tableau de bord inspiré de GLPI
        </p>
      </div>
    </aside>
  );
}
