import AddMaterielCard from "@/components/materiel/AddMaterielCard";
import { ReactElement } from "react";

export default function AddMaterielPage(): ReactElement {
  return (
    <main className="flex flex-col items-center">
      <AddMaterielCard />
    </main>
  );
}
