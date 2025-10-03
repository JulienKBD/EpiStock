export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export type Materiel = {
  id: number;
  name: string;
  type: string;
  numero_serie: string;
  marque: string;
  valeur: number;
  etat: string;
  emplacement: string;
  image_url?: string;
};

export async function fetchMaterielCount(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/materiel`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.status === 404) {
      // Backend returns 404 when no matériel; treat as 0 items
      return 0;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch materiel: ${res.status}`);
    }

    const data = (await res.json()) as Materiel[];
    return Array.isArray(data) ? data.length : 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
}
