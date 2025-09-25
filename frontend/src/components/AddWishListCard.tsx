import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { LightbulbIcon } from "lucide-react";

export default function AddWishListCard(): ReactElement {
  return (
    <Button
      className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer p-10 mb-10"
    >
      <LightbulbIcon size={25} />
      Proposer du matériel
    </Button>
  );
}
