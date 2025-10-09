"use client";

import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import PresentationCard from "@/components/PresentationCard";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { CableIcon, ComputerIcon, MonitorIcon, PackageIcon } from "lucide-react";

export default function Home(): ReactElement {
  const [ordinateurCount, setOrdinateurCount] = useState<number>(0);
  const [cableCount, setCableCount] = useState<number>(0);
  const [moniteurCount, setMoniteurCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3001/materiel/stats`);
        if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

        const data = await response.json();
        setOrdinateurCount(data.ordinateurs || 0);
        setCableCount(data.cables || 0);
        setMoniteurCount(data.moniteurs || 0);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setError("Impossible de charger les statistiques du dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const totalMateriel = ordinateurCount + cableCount + moniteurCount;

  return (
    <main>
      {/* SECTION ACCUEIL */}
      <section className="max-w-5xl mx-auto text-center space-y-6 py-24">
        <h1 className="text-4xl font-bold">Bienvenue sur EpiStock</h1>
        <p className="text-lg text-gray-600">
          Gérez facilement le matériel de l'école EPITECH Réunion. Suivi, inventaire et attribution en un seul endroit.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="/materiel"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Voir le matériel
          </Link>
          <Link
            href="/wishlist"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Proposer du matériel
          </Link>
        </div>
      </section>

      {/* SECTION PRÉSENTATION */}
      <section className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-4 gap-8">
        <PresentationCard
          title="Documentation"
          description="Accédez à tous nos guides pour bien démarrer et utiliser EpiStock."
        />
        <PresentationCard
          title="Matériel"
          description="Gérez vos équipements, suivez l’inventaire et les attributions."
        />
        <PresentationCard
          title="Dashboard"
          description="Un tableau de bord complet pour suivre vos données importantes."
        />
        <PresentationCard
          title="Liste de souhaits"
          description="Proposez du matériel pour l'école."
        />
      </section>

      {/* SECTION DASHBOARD */}
      <section>
        <h2 className="font-bold text-2xl text-center mt-10">Dashboard</h2>

        {loading ? (
          <div className="flex justify-center items-center h-32 mt-10">
            <span className="animate-pulse text-gray-500">Chargement des données...</span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : (
          <div className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-4 gap-8">
            <DashboardCard
              title="Ordinateurs"
              number={ordinateurCount.toString()}
              icon={<ComputerIcon className="w-10 h-10 text-blue-600" />}
            />
            <DashboardCard
              title="Câbles"
              number={cableCount.toString()}
              icon={<CableIcon className="w-10 h-10 text-blue-600" />}
            />
            <DashboardCard
              title="Moniteurs"
              number={moniteurCount.toString()}
              icon={<MonitorIcon className="w-10 h-10 text-blue-600" />}
            />
            <DashboardCard
              title="Total du matériel"
              number={totalMateriel.toString()}
              icon={<PackageIcon className="w-10 h-10 text-green-600" />}
            />
          </div>
        )}
      </section>
    </main>
  );
}
