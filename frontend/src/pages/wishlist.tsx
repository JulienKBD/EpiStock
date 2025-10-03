"use client";

import { useEffect, useState, ReactElement } from "react";
import AddWishListButton from "@/components/wishlist/AddWishListButton";
import WishlistCard from "@/components/wishlist/WishlistCard";

export default function WishListPage(): ReactElement {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://localhost:3001/wishlist");
        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        const data = await response.json();
        setWishlist(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Erreur lors du fetch wishlist:", err);
        setError("Impossible de charger la wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <main className="flex flex-col items-center space-y-6">
      {/* Bouton d’ajout */}
      <AddWishListButton />

      {/* Gestion état de chargement */}
      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Liste des cartes */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <WishlistCard
              key={item.id}
              name={item.name}
              type={item.type}
              image={item.image}
              numeroSerie={item.numeroSerie}
              marque={item.marque}
              valeur={`${item.valeur} €`}
            />
          ))}

          {wishlist.length === 0 && (
            <p className="text-gray-400 text-center col-span-full">
              Aucun élément dans la wishlist.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
