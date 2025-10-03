"use client";

import { ReactElement, useEffect, useState } from "react";
import { fetchRecentMateriel, Materiel } from "@/lib/api";
import { Clock } from "lucide-react";

function timeAgo(iso?: string): string {
  if (!iso) return "date inconnue";
  const now = Date.now();
  const t = new Date(iso).getTime();
  const diff = Math.max(0, Math.floor((now - t) / 1000));
  if (diff < 60) return `il y a ${diff}s`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `il y a ${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `il y a ${d}j`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `il y a ${mo} mois`;
  const y = Math.floor(mo / 12);
  return `il y a ${y} an${y > 1 ? "s" : ""}`;
}

export default function RecentMaterielButton(): ReactElement {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Materiel[]>([]);

  const load = async () => {
    setLoading(true);
    const data = await fetchRecentMateriel(6);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    if (open) void load();
  }, [open]);

  return (
    <div className="p-6 bg-slate-300 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">Nouveau</h3>
        <button
          onClick={() => setOpen((v) => !v)}
          className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          {open ? "Fermer" : "Voir"}
        </button>
      </div>
      <p>Derniers matériels ajoutés récemment.</p>

      {open && (
        <div className="mt-4 space-y-3">
          {loading && <p className="text-sm text-slate-700">Chargement…</p>}
          {!loading && items.length === 0 && (
            <p className="text-sm text-slate-700">Aucun matériel récemment ajouté.</p>
          )}
          {!loading && items.map((it) => (
            <div key={it.id} className="flex items-start gap-3 rounded-md p-3 bg-white/50">
              <div className="grow min-w-0">
                <p className="font-medium text-slate-900 line-clamp-1">{it.name} <span className="text-slate-500">• {it.type}</span></p>
                {it.marque && <p className="text-sm text-slate-700">{it.marque}</p>}
              </div>
              <div className="shrink-0 flex items-center gap-1 text-xs text-slate-600">
                <Clock className="h-3.5 w-3.5" />
                {timeAgo(it.created_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
