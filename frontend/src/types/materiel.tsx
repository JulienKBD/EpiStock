export type EtatMateriel = "Disponible" | "En prêt" | "En panne";

export interface Materiel {
  name: string;
  type: string;
  numeroSerie: string;
  marque: string;
  valeur: number;
  etat: EtatMateriel;
  emplacement: string;
  image: string;
}
