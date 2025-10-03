"use client";

import { ReactElement, useState } from "react";

export default function AddMaterielCard(): ReactElement {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [marque, setMarque] = useState("");
  const [valeur, setValeur] = useState("");
  const [etat, setEtat] = useState("Disponible");
  const [emplacement, setEmplacement] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      setName("");
      setType("");
      setNumeroSerie("");
      setMarque("");
      setValeur("");
      setEtat("Disponible");
      setEmplacement("");
      setImageUrl("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du matériel:", error);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
        Ajouter un matériel
      </h3>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <InputField label="Nom" value={name} setValue={setName} placeholder="Ex: Câble HDMI" required />
        <InputField label="Type" value={type} setValue={setType} placeholder="Ex: Câble" required />
        <InputField label="Numéro de série" value={numeroSerie} setValue={setNumeroSerie} placeholder="Ex: HDMI123456" />
        <InputField label="Marque" value={marque} setValue={setMarque} placeholder="Ex: Belkin" />
        <InputField label="Valeur (€)" type="number" value={valeur} setValue={setValeur} placeholder="Ex: 50" />

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

        <InputField label="Emplacement" value={emplacement} setValue={setEmplacement} placeholder="Ex: Salle ALAN" />
        <InputField label="Image URL" value={imageUrl} setValue={setImageUrl} placeholder="Ex: /assets/HDMI-Cable.png" />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-semibold"
        >
          Ajouter à la Wishlist
        </button>
      </form>
    </div>
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
