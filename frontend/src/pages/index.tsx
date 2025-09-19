import Link from "next/link";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <main className="py-25">
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">Bienvenue sur EpiStock</h1>
        <p className="text-lg">
          Gérez facilement le matériel de l'école EPITECH Réunion. Suivi, inventaire et attribution en un seul endroit.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link
            href="/materiel"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Voir le matériel
          </Link>
          <Link
            href="/materiel"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Ajouter du matériel
          </Link>
        </div>
      </section>

      {/* Fonctionnalités / cartes */}
      <section className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-8">
        <div className="p-6  bg-slate-300 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Documentation</h3>
          <p>Accédez à tous nos guides pour bien démarrer et utiliser EpiStock.</p>
        </div>
        <div className="p-6 bg-slate-300 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Matériel</h3>
          <p>Gérez vos équipements, suivez l’inventaire et les attributions.</p>
        </div>
        <div className="p-6 bg-slate-300 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
          <p>Un tableau de bord complet pour suivre vos données importantes.</p>
        </div>
      </section>
    </main>
  );
}
