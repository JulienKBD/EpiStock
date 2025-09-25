import { ReactElement, useMemo, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import TicketsTable from "@/components/dashboard/TicketsTable";
import ActivityList, { ActivityIcons } from "@/components/dashboard/ActivityList";
import DashboardFilter from "@/components/dashboard/DashboardFilter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Filter, RefreshCw, Ticket, Monitor, Users } from "lucide-react";

export default function Dashboard(): ReactElement {
  const allTickets = useMemo(
    () => [
      { id: 1324, subject: "Changement écran salle A", requester: "Jean D.", status: "En cours" as const, priority: "Haute" as const, updatedAt: "Il y a 2h" },
      { id: 1323, subject: "Badge non reconnu", requester: "Clara M.", status: "Nouveau" as const, priority: "Moyenne" as const, updatedAt: "Il y a 5h" },
      { id: 1320, subject: "PC portable prêt", requester: "Pauline S.", status: "Résolu" as const, priority: "Basse" as const, updatedAt: "Hier" },
      { id: 1318, subject: "Stock câbles HDMI", requester: "Service IT", status: "En attente" as const, priority: "Urgente" as const, updatedAt: "Hier" },
    ],
    []
  );

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [status, setStatus] = useState<string>("Tous");
  const [priority, setPriority] = useState<string>("Toutes");
  const [search, setSearch] = useState<string>("");

  const tickets = useMemo(() => {
    return allTickets.filter((t) => {
      const statusOk = status === "Tous" || t.status === status;
      const prioOk = priority === "Toutes" || t.priority === priority;
      const q = search.trim().toLowerCase();
      const searchOk = !q || `${t.id} ${t.subject} ${t.requester}`.toLowerCase().includes(q);
      return statusOk && prioOk && searchOk;
    });
  }, [allTickets, status, priority, search]);

  const activities = useMemo(
    () => [
      { icon: <ActivityIcons.Wrench className="h-4 w-4" />, title: "Ticket #1324 pris en charge", description: "Technicien assigné: M. Dupont", time: "il y a 1h" },
      { icon: <ActivityIcons.Monitor className="h-4 w-4" />, title: "Nouveau matériel ajouté", description: "Moniteur LG 27''", time: "il y a 3h" },
      { icon: <ActivityIcons.LogIn className="h-4 w-4" />, title: "Connexion admin", description: "admin@epitech.re", time: "il y a 5h" },
      { icon: <ActivityIcons.UserPlus className="h-4 w-4" />, title: "Nouvel utilisateur", description: "clara.m@epitech.eu", time: "hier" },
    ],
    []
  );

  return (
    <div className="flex-1 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-sm text-slate-500">Vue d'ensemble des tickets, matériels et utilisateurs</p>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger aria-label="Période" className="cursor-pointer">
              <SelectValue placeholder="7 derniers jours" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7" className="cursor-pointer">7 derniers jours</SelectItem>
              <SelectItem value="30" className="cursor-pointer">30 jours</SelectItem>
              <SelectItem value="90" className="cursor-pointer">90 jours</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setFiltersOpen(true)}><Filter className="h-4 w-4" />Filtres</Button>
          <Button variant="outline" size="sm" className="cursor-pointer"><RefreshCw className="h-4 w-4" />Actualiser</Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"><PlusCircle className="h-4 w-4" />Nouveau ticket</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Tickets ouverts" value={42} trend={{ value: 6, direction: "up" }} icon={<Ticket className="h-4 w-4" />} accent="blue" />
        <StatCard title="Matériel total" value={318} trend={{ value: 2, direction: "up" }} icon={<Monitor className="h-4 w-4" />} accent="green" />
        <StatCard title="Utilisateurs" value={127} trend={{ value: 1, direction: "down" }} icon={<Users className="h-4 w-4" />} accent="orange" />
        <StatCard title="Tickets en attente" value={5} icon={<Ticket className="h-4 w-4" />} accent="red" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Tickets récents</h2>
            <Button variant="link" className="px-0">Voir tous</Button>
          </div>
          <TicketsTable data={tickets} />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Activité récente</h2>
          <ActivityList items={activities as any} />
        </div>
      </div>

      {/* Filters Sheet */}
      <DashboardFilter
        open={filtersOpen}
        setOpen={setFiltersOpen}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}
