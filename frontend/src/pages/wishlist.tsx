import AddWishListButton from "@/components/AddWishListButton";
import { ReactElement } from "react";

export default function WishListPage(): ReactElement {
  return (
    <main className="flex flex-col items-center">
      <AddWishListButton />
    </main>
  );
}
