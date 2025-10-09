import { ReactElement } from "react";
import RecentMaterielList from "@/components/materiel/RecentMaterielList";

export default function DocsPage(): ReactElement {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Nouveau</h1>
      <RecentMaterielList limit={6} autoRefreshMs={0} />
    </main>
  );
}
