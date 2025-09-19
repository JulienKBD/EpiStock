import Link from "next/link";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <main>
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">Bienvenue sur EpiStock</h1>
        <p className="text-lg">
          Gérez facilement le matériel de l'école EPITECH Réunion. Suivi, inventaire et attribution en un seul endroit.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link
            href="/materials"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Voir le matériel
          </Link>
          <Link
            href="/materials"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Ajouter du matériel
          </Link>
        </div>
      </section>
    </main>
  );
}
