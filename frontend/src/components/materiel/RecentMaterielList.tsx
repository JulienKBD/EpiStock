"use client";

import { ReactElement, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Clock, RefreshCw } from "lucide-react";
import { fetchRecentMateriel, Materiel } from "@/lib/api";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function RecentMaterielList({ limit = 6, autoRefreshMs = 0 }: { limit?: number; autoRefreshMs?: number }): ReactElement {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Materiel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRecentMateriel(limit);
      setItems(data);
    } catch (e) {
      console.error(e);
      setError("Impossible de charger les nouveaux matériels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load(); // initial
  }, [limit, refreshKey]);

  // Optional auto-refresh polling
  useEffect(() => {
    if (!autoRefreshMs || autoRefreshMs < 1000) return;
    const id = setInterval(() => {
      setRefreshKey((k) => k + 1);
    }, autoRefreshMs);
    return () => clearInterval(id);
  }, [autoRefreshMs]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: Math.max(3, Math.min(6, limit)) }).map((_, i) => (
            <div key={i} className="animate-pulse flex gap-3 rounded-lg border bg-white p-3">
              <div className="h-12 w-12 rounded bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 rounded bg-slate-200" />
                <div className="h-3 w-1/3 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="text-sm text-red-600">{error}</p>;
    }

    if (!items.length) {
      return <p className="text-sm text-slate-600">Aucun matériel récemment ajouté.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 rounded-lg border bg-white p-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded border bg-slate-100">
              {it.image_url ? (
                <Image src={it.image_url} alt={it.name} fill className="object-contain" />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-900">
                {it.name} {it.type && <span className="text-slate-500">• {it.type}</span>}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                {it.marque && <Badge variant="outline">{it.marque}</Badge>}
                {typeof it.valeur === "number" && !Number.isNaN(it.valeur) && (
                  <Badge variant="secondary">{it.valeur}€</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo(it.created_at)}
            </div>
          </div>
        ))}
      </div>
    );
  }, [loading, error, items, limit]);

  return (
    <Card className="bg-slate-50">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl">Nouveaux matériels</CardTitle>
        <CardDescription>Derniers éléments ajoutés à l’inventaire.</CardDescription>
        <CardAction>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
            aria-label="Actualiser"
          >
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </button>
        </CardAction>
      </CardHeader>
      <CardContent className="py-6">
        {content}
      </CardContent>
    </Card>
  );
}
