import HardwareCard from "@/components/HardwareCard";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <main>
      <HardwareCard
        nom="Câble HDMI"
        type="Accessoire vidéo"
        image="/assets/HDMI-Cable.png"
        numeroSerie="HDMI123456"
        marque="Belkin"
        valeur="15€"
        etat="Bon état"
        emplacement="Salle ALAN"
      />
    </main>
  );
}
