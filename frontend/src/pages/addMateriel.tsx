"use client";

import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMaterielPage(): ReactElement {
  const router = useRouter();

  const [name, setName] = useState("");
  const [type, setType] = useState("Câble");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [marque, setMarque] = useState("");
  const [valeur, setValeur] = useState("");
  const [etat, setEtat] = useState("Disponible");
  const [emplacement, setEmplacement] = useState("ADA");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newMateriel = {
      name,
      type,
      numeroSerie,
      marque,
      valeur: parseFloat(valeur),
      etat,
      emplacement,
      image_url: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:3001/materiel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMateriel),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      const data = await response.json();
      console.log("Matériel ajouté:", data);

        router.push("/materiel");
    } catch (err: any) {
      console.error("Erreur lors de l'ajout du matériel:", err);
      setError("Impossible d’ajouter le matériel. Veuillez réessayer.");
    }
  };

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Ajouter un matériel
        </h3>

        {error && (
          <div className="p-3 rounded-md bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <InputField label="Nom" value={name} setValue={setName} placeholder="Câble HDMI" required />

          {/* Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
            >
              <option value="Câble">Câble</option>
              <option value="Casque audio">Casque audio</option>
              <option value="Clavier">Clavier</option>
              <option value="Imprimantes">Imprimantes</option>
              <option value="Moniteur">Moniteur</option>
              <option value="Ordinateur">Ordinateur</option>
              <option value="Souris">Souris</option>
              <option value="Autres">Autres</option>
            </select>
          </div>

          <InputField label="Numéro de série" value={numeroSerie} setValue={setNumeroSerie} placeholder="HDMI123456" />
          <InputField label="Marque" value={marque} setValue={setMarque} placeholder="Belkin" />
          <InputField label="Valeur (€)" type="number" value={valeur} setValue={setValeur} placeholder="50" />

          {/* État */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">État</label>
            <select
              value={etat}
              onChange={(e) => setEtat(e.target.value)}
              className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
            >
              <option value="Disponible">Disponible</option>
              <option value="En prêt">En prêt</option>
              <option value="En panne">En panne</option>
            </select>
          </div>

          {/* Emplacement */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Emplacement</label>
            <select
              value={emplacement}
              onChange={(e) => setEmplacement(e.target.value)}
              className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
            >
              <option value="ADA">ADA</option>
              <option value="ALAN">ALAN</option>
              <option value="DENNIS">DENNIS</option>
              <option value="GORDON">GORDON</option>
              <option value="GRACE">GRACE</option>
              <option value="ISAAC">ISAAC (HUB)</option>
              <option value="LINUS">LINUS</option>
              <option value="MARGARET">MARGARET</option>
              <option value="PEDAGOGIE">PEDAGOGIE</option>
              <option value="STEVE">STEVE</option>
              <option value="TIM">TIM</option>
              <option value="Autres">Autres</option>
            </select>
          </div>

          <InputField label="Image URL" value={imageUrl} setValue={setImageUrl} placeholder="/assets/HDMI-Cable.png" />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-semibold"
          >
            Ajouter aux matériel
          </button>
        </form>
      </div>
    </main>
  );
}

function InputField({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-1 p-2 border rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
