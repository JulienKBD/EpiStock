"use client";

import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

interface MaterielFilterProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  marqueFilter: string;
  setMarqueFilter: (value: string) => void;
  valeurFilter: [number, number];
  setValeurFilter: (value: [number, number]) => void;
  etatFilter: string;
  setEtatFilter: (value: string) => void;
  emplacementFilter: string;
  setEmplacementFilter: (value: string) => void;
}

export default function MaterielFilter({
  open,
  setOpen,
  typeFilter,
  setTypeFilter,
  marqueFilter,
  setMarqueFilter,
  valeurFilter,
  setValeurFilter,
  etatFilter,
  setEtatFilter,
  emplacementFilter,
  setEmplacementFilter,
}: MaterielFilterProps): ReactElement {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-[400px] p-6 bg-slate-200 overflow-visible z-[60]"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Filtres Matériel</SheetTitle>
        </SheetHeader>

        {/* Type */}
        <div className="mt-6">
          <Label htmlFor="type">Type</Label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger id="type" className="mt-1 w-full bg-white">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent className="z-[70] bg-white border border-slate-200 shadow-lg">
              {["Tous", "Câble", "Ordinateur", "Écran", "Accessoire"].map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Marque */}
        <div className="mt-4">
          <Label htmlFor="marque">Marque</Label>
          <Select value={marqueFilter} onValueChange={setMarqueFilter}>
            <SelectTrigger id="marque" className="mt-1 w-full bg-white">
              <SelectValue placeholder="Sélectionner une marque" />
            </SelectTrigger>
            <SelectContent className="z-[70] bg-white border border-slate-200 shadow-lg">
              {["Tous", "Belkin", "Logitech", "Dell", "HP", "LG"].map((marque) => (
                <SelectItem key={marque} value={marque}>
                  {marque}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Valeur (Range Slider) */}
        <div className="mt-6">
          <Label>Valeur (€)</Label>
          <Slider
            value={valeurFilter}
            onValueChange={(newValue) => setValeurFilter(newValue as [number, number])}
            min={0}
            max={1000}
            step={1}
            className="mt-2 h-5 bg-white rounded-xl"
          />
          <div className="flex justify-between text-sm mt-1 text-slate-700">
            <span>{valeurFilter[0]}€</span>
            <span>{valeurFilter[1]}€</span>
          </div>
        </div>

        {/* État */}
        <div className="mt-4">
          <Label htmlFor="etat">État</Label>
          <Select value={etatFilter} onValueChange={setEtatFilter}>
            <SelectTrigger id="etat" className="mt-1 w-full bg-white">
              <SelectValue placeholder="Sélectionner l'état" />
            </SelectTrigger>
            <SelectContent className="z-[70] bg-white border border-slate-200 shadow-lg">
              {["Tous", "Disponible", "En prêt", "En panne"].map((etat) => (
                <SelectItem key={etat} value={etat}>
                  {etat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Emplacement */}
        <div className="mt-4">
          <Label htmlFor="emplacement">Emplacement</Label>
          <Select value={emplacementFilter} onValueChange={setEmplacementFilter}>
            <SelectTrigger id="emplacement" className="mt-1 w-full bg-white">
              <SelectValue placeholder="Sélectionner un emplacement" />
            </SelectTrigger>
            <SelectContent className="z-[70] bg-white border border-slate-200 shadow-lg">
              {["Tous", "Alan", "Denis", "Ada", "Steve", "Hub"].map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setOpen(false)}
        >
          Appliquer
        </Button>
      </SheetContent>
    </Sheet>
  );
}
