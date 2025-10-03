import { PlusIcon } from "lucide-react";
import { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

export default function AddMaterielButton(): ReactElement {
  const router = useRouter();

  const handleClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/addMateriel");
    }
  };

  return (
    <main className="flex flex-col items-center">
      <Button
        onClick={handleClick}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md transition"
      >
        <PlusIcon size={25} />
        Ajouter du matériel
      </Button>
    </main>
  );
}
