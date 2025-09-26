"use client";

import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import HardwareCard from "@/components/HardwareCard";
import MaterielFilter from "@/components/MaterielFilter";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface Materiel {
  nom: string;
  type: string;
  marque: string;
  valeur: number;
  etat: string;
  emplacement: string;
  image: string;
  numeroSerie: string;
}

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
          nom: item.name,
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
      {/* Bouton pour ouvrir le filtre */}
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md transition"
      >
        <SlidersHorizontal className="w-5 h-5" />
        Filtres
      </Button>

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
        <div className="max-w-8xl mx-auto grid md:grid-cols-4 pt-5 justify-items-center">
          {materielsFiltres.map((item) => (
            <HardwareCard
              key={item.numeroSerie}
              {...item}
              valeur={`${item.valeur}€`}
            />
          ))}
          {materielsFiltres.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              Aucun matériel ne correspond aux filtres.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
