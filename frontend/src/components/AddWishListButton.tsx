"use client";

import { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LightbulbIcon } from "lucide-react";

export default function AddWishListCard(): ReactElement {
  const router = useRouter();

  const handleClick = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.push("/addWishlist");
    } else {
      router.push("/login");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer p-10 mb-10 flex items-center gap-2"
    >
      <LightbulbIcon size={25} />
      Proposer du matériel
    </Button>
  );
}
