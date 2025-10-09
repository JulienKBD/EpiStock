"use client";

import { ReactElement, useState } from "react";

export default function AddWishlistPage(): ReactElement {
  const [name, setName] = useState("");
  const [marque, setMarque] = useState("");
  const [valeur, setValeur] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWish = {
      name,
      marque,
      valeur: valeur ? parseFloat(valeur) : null,
      image_url: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:3001/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWish),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      const data = await response.json();
      console.log("Matériel proposé dans la wishlist :", data);

      setName("");
      setMarque("");
      setValeur("");
      setImageUrl("");
    } catch (error) {
      console.error("Erreur lors de l'ajout à la wishlist:", error);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Proposer un matériel
        </h3>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
              placeholder="Ex: Câble HDMI"
              required
            />
          </div>

          {/* Marque */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Marque</label>
            <input
              type="text"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
              placeholder="Ex: Belkin"
            />
          </div>

          {/* Valeur */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Valeur (€)</label>
            <input
              type="number"
              value={valeur}
              onChange={(e) => setValeur(e.target.value)}
              className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
              placeholder="Ex: 15"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
              placeholder="Ex: /assets/HDMI-Cable.png"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Proposer
          </button>
        </form>
      </div>
    </main>
  );
}
