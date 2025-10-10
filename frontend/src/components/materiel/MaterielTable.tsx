"use client";

import { ReactElement, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Materiel } from "@/types/materiel";

interface MaterielTableProps {
  data: Materiel[];
}

export default function MaterielTable({ data }: MaterielTableProps): ReactElement {
  const typeTotals = useMemo(() => {
    const totals = new Map<string, number>();
    for (const item of data) {
      totals.set(item.type, (totals.get(item.type) ?? 0) + 1);
    }
    return totals;
  }, [data]);

  const uniqueByType = useMemo(() => {
    const seen = new Set<string>();
    const unique: Materiel[] = [];
    for (const item of data) {
      if (!seen.has(item.type)) {
        seen.add(item.type);
        unique.push(item);
      }
    }
    return unique;
  }, [data]);

  const emplacementsByType = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const item of data) {
      const key = item.type;
      const emp = (item.emplacement || "").trim();
      if (!emp) continue;
      const arr = map.get(key) ?? [];
      if (!arr.includes(emp)) arr.push(emp);
      map.set(key, arr);
    }
    return map;
  }, [data]);

  return (
    <div className="w-full overflow-x-auto rounded-lg border shadow-md bg-slate-100">
      <Table>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="font-bold bg-white">Image</TableHead>
            <TableHead className="font-bold bg-white">Nom</TableHead>
            <TableHead className="font-bold bg-white">Type</TableHead>
            <TableHead className="font-bold bg-white">Numéro de série</TableHead>
            <TableHead className="font-bold bg-white">Marque</TableHead>
            <TableHead className="font-bold bg-white">Valeur (€)</TableHead>
            <TableHead className="font-bold bg-white">État</TableHead>
            <TableHead className="font-bold bg-white">Emplacement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueByType.map((item) => {
            const totalForType = typeTotals.get(item.type) ?? 0;
            const showCounter = totalForType >= 2;

            return (
            <TableRow key={item.numeroSerie}>
              <TableCell>
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{item.type}</span>
                  {showCounter && (
                    <Badge variant="secondary">x{totalForType}</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{item.numeroSerie}</TableCell>
              <TableCell>{item.marque}</TableCell>
              <TableCell>{item.valeur}€</TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.etat === "Disponible"
                      ? "success"
                      : item.etat === "En prêt"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {item.etat}
                </Badge>
              </TableCell>
              <TableCell>
                {(() => {
                  const emps = emplacementsByType.get(item.type) ?? (item.emplacement ? [item.emplacement] : []);
                  const text = emps.join(", ");
                  return (
                    <div
                      className="max-w-[200px] overflow-x-auto whitespace-nowrap pr-2"
                      onWheel={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                          el.scrollLeft += e.deltaY;
                          e.preventDefault();
                        }
                      }}
                    >
                      <span>{text}</span>
                    </div>
                  );
                })()}
              </TableCell>
            </TableRow>
          );})}
        </TableBody>
      </Table>
    </div>
  );
}
