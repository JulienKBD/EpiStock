"use client";

import { ReactElement, useState } from "react";
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
  const [typeFilter, setTypeFilter] = useState("");
  const [marqueFilter, setMarqueFilter] = useState("");
  const [valeurFilter, setValeurFilter] = useState<[number, number]>([0, 1000]);
  const [etatFilter, setEtatFilter] = useState("");
  const [emplacementFilter, setEmplacementFilter] = useState("");

  const materiels: Materiel[] = [
    {
      nom: "Câble HDMI",
      type: "Accessoire",
      marque: "Belkin",
      valeur: 15,
      etat: "Bon état",
      emplacement: "Salle ALAN",
      image: "/assets/HDMI-Cable.png",
      numeroSerie: "HDMI123456",
    },
    {
      nom: "Ordinateur Dell",
      type: "Ordinateur",
      marque: "Dell",
      valeur: 800,
      etat: "Neuf",
      emplacement: "Salle Steve",
      image: "/assets/dell.png",
      numeroSerie: "DELL123456",
    },
    {
      nom: "Écran LG",
      type: "Écran",
      marque: "LG",
      valeur: 200,
      etat: "Occasion",
      emplacement: "Salle Hub",
      image: "/assets/lg-monitor.png",
      numeroSerie: "LG123456",
    },
  ];

  const materielsFiltres = materiels.filter(item => {
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
    <main className="p-4 space-y-6">
      {/* Bouton pour ouvrir le filtre */}
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
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

      {/* Liste des matériels filtrés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {materielsFiltres.map(item => (
          <HardwareCard key={item.numeroSerie} {...item} valeur={`${item.valeur}€`} />
        ))}
        {materielsFiltres.length === 0 && (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            Aucun matériel ne correspond aux filtres.
          </p>
        )}
      </div>
    </main>
  );
}
