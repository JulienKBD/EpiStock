import { ReactElement, useState } from "react";

export default function ProposeMaterialCard(): ReactElement {
  const [nom, setNom] = useState("");
  const [type, setType] = useState("");
  const [marque, setMarque] = useState("");
  const [valeur, setValeur] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ nom, type, marque, valeur });
    setNom("");
    setType("");
    setMarque("");
    setValeur("");
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
        Proposer un matériel
      </h3>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
            placeholder="Ex: Câble HDMI"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
            placeholder="Ex: Câble"
            required
          />
        </div>

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

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
        >
          Proposer
        </button>
      </form>
    </div>
  );
}
