import WishListCard from "@/components/WishListCard";
import AddWishListCard from "@/components/AddWishListCard";
import { ReactElement } from "react";

export default function WishListPage(): ReactElement {
  return (
    <main className="flex flex-col items-center">
      <AddWishListCard />
      <WishListCard />
    </main>
  );
}
