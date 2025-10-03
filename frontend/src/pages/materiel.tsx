"use client";

import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import HardwareTable from "@/components/materiel/MaterielTable";
import MaterielFilter from "@/components/materiel/MaterielFilter";
import { Button } from "@/components/ui/button";
import AddMaterielButton from "@/components/materiel/AddMaterielButton"
import { SlidersHorizontal } from "lucide-react";
import type { Materiel } from "@/types/materiel";

export default function MaterielPage(): ReactElement {
  const [open, setOpen] = useState(false);
  const [materiels, setMateriels] = useState<Materiel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtres
  const [typeFilter, setTypeFilter] = useState("");
  const [marqueFilter, setMarqueFilter] = useState("");
  const [valeurFilter, setValeurFilter] = useState<[number, number]>([0, 1000]);
  const [etatFilter, setEtatFilter] = useState("");
  const [emplacementFilter, setEmplacementFilter] = useState("");

  useEffect(() => {
    const fetchMateriels = async () => {
      try {
        const response = await fetch("http://localhost:3001/materiel");
        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        const data = await response.json();

        const mappedData: Materiel[] = data.map((item: any) => ({
          name: item.name,
          type: item.type,
          marque: item.marque,
          valeur: Number(item.valeur),
          etat: item.etat,
          emplacement: item.emplacement,
          image: item.image_url,
          numeroSerie: item.numero_serie,
        }));

        setMateriels(mappedData);
      } catch (err: any) {
        console.error("Erreur lors du fetch:", err);
        setError("Impossible de charger les matériels.");
      } finally {
        setLoading(false);
      }
    };

    fetchMateriels();
  }, []);

  const materielsFiltres = materiels.filter((item) => {
    return (
      (typeFilter === "" || typeFilter === "Tous" || item.type === typeFilter) &&
      (marqueFilter === "" || marqueFilter === "Tous" || item.marque === marqueFilter) &&
      item.valeur >= valeurFilter[0] &&
      item.valeur <= valeurFilter[1] &&
      (etatFilter === "" || etatFilter === "Tous" || item.etat === etatFilter) &&
      (emplacementFilter === "" || emplacementFilter === "Tous" || item.emplacement === emplacementFilter)
    );
  });

  return (
    <main className="space-y-6">
      <div className="flex items-center gap-2">
        {/* Bouton pour ouvrir le filtre */}
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md transition"
          >
          <SlidersHorizontal className="w-5 h-5" />
          Filtres
        </Button>

        {/* Bouton pour ajouter du materiel */}
        <AddMaterielButton />
      </div>

      {/* Composant de filtre */}
      <MaterielFilter
        open={open}
        setOpen={setOpen}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        marqueFilter={marqueFilter}
        setMarqueFilter={setMarqueFilter}
        valeurFilter={valeurFilter}
        setValeurFilter={setValeurFilter}
        etatFilter={etatFilter}
        setEtatFilter={setEtatFilter}
        emplacementFilter={emplacementFilter}
        setEmplacementFilter={setEmplacementFilter}
      />

      {/* Affichage selon état */}
      {loading && <p className="text-center text-gray-500">Chargement...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Liste des matériels filtrés */}
      {!loading && !error && (
        <div className="max-w-8xl mx-auto pt-5">
          {materielsFiltres.length > 0 ? (
            <HardwareTable data={materielsFiltres} />
          ) : (
            <p className="text-center text-gray-500">
              Aucun matériel ne correspond aux filtres.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
