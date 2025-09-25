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
      etat: "En prêt",
      emplacement: "Salle ALAN",
      image: "/assets/HDMI-Cable.png",
      numeroSerie: "HDMI123456",
    },
    {
      nom: "Ordinateur Dell",
      type: "Ordinateur",
      marque: "Dell",
      valeur: 800,
      etat: "En panne",
      emplacement: "Salle Steve",
      image: "/assets/Dell_Laptop.png",
      numeroSerie: "DELL123456",
    },
    {
      nom: "Écran LG",
      type: "Écran",
      marque: "LG",
      valeur: 200,
      etat: "Disponnible",
      emplacement: "Salle Hub",
      image: "/assets/LG_Monitor.png",
      numeroSerie: "LG123456",
    },
    {
      nom: "Écran LG",
      type: "Écran",
      marque: "LG",
      valeur: 200,
      etat: "En prêt",
      emplacement: "Salle Denis",
      image: "/assets/LG_Monitor.png",
      numeroSerie: "LG789456",
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

      {/* Liste des matériels filtrés */}
      <div className="max-w-8xl mx-auto grid md:grid-cols-4 pt-5 justify-items-center">
        {materielsFiltres.map(item => (
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

    </main>
  );
}
