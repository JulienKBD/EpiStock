import WishListCard from "@/components/wishlist/ProposeMaterialCard";
import { ReactElement } from "react";

export default function AddWishListPage(): ReactElement {
  return (
    <main className="flex flex-col items-center">
      <WishListCard />
    </main>
  );
}
