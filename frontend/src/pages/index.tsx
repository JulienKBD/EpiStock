import Link from "next/link";
import { ReactElement } from "react";
import PresentationCard from '@/components/PresentationCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { CableIcon, ComputerIcon, MonitorIcon } from "lucide-react";

export default function Home(): ReactElement {
  return (
    <main>
      <section className="max-w-5xl mx-auto text-center space-y-6 py-25">
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
            href="/wishlist"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Proposer du matériel
          </Link>
        </div>
      </section>

      {/* Fonctionnalités / cartes */}
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

      <section>
        <h2 className="font-bold text-xl text-center">Dashboard</h2>
        <div className="max-w-7xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-8">
          <DashboardCard
            title="Ordinateurs"
            number="42"
            icon={<ComputerIcon className="w-10 h-10 text-blue-600" />}
          />
          <DashboardCard
            title="Câble"
            number="42"
            icon={<CableIcon className="w-10 h-10 text-blue-600" />}
          />
          <DashboardCard
            title="Moniteurs"
            number="42"
            icon={<MonitorIcon className="w-10 h-10 text-blue-600" />}
          />
        </div>
      </section>
    </main>
  );
}
