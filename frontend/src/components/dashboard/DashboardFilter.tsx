"use client";

import { ReactElement } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  status: string;
  setStatus: (v: string) => void;
  priority: string;
  setPriority: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
};

export default function DashboardFilter({ open, setOpen, status, setStatus, priority, setPriority, search, setSearch }: Props): ReactElement {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[380px] p-6 bg-slate-200 overflow-visible z-[60]">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Filtres des tickets</SheetTitle>
        </SheetHeader>

        {/* Statut */}
        <div className="mt-6">
          <label htmlFor="status" className="block text-sm font-medium text-slate-700">Statut</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status" className="mt-1 w-full bg-white">
              <SelectValue placeholder="Tous" />
            </SelectTrigger>
            <SelectContent className="z-[70] bg-white border border-slate-200 shadow-lg">
              {["Tous", "Nouveau", "En cours", "En attente", "Résolu"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priorité */}
        <div className="mt-4">
          <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priorité</label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority" className="mt-1 w-full bg-white">
              <SelectValue placeholder="Toutes" />
            </SelectTrigger>
            <SelectContent className="z-[70] bg-white border border-slate-200 shadow-lg">
              {["Toutes", "Basse", "Moyenne", "Haute", "Urgente"].map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Recherche */}
        <div className="mt-4">
          <label htmlFor="search" className="block text-sm font-medium text-slate-700">Recherche</label>
          <input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sujet, demandeur…"
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-[3px] focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="mt-6 flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setOpen(false)}>Appliquer</Button>
          <Button variant="outline" onClick={() => { setStatus("Tous"); setPriority("Toutes"); setSearch(""); }}>Réinitialiser</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
