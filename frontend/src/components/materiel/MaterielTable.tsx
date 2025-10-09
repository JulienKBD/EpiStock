"use client";

import { ReactElement } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Materiel } from "@/types/materiel";

interface MaterielTableProps {
  data: Materiel[];
}

export default function MaterielTable({ data }: MaterielTableProps): ReactElement {
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
          {data.map((item) => (
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
              <TableCell>{item.type}</TableCell>
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
              <TableCell>{item.emplacement}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
