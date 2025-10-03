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
  created_at?: string;
  updated_at?: string;
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

export async function fetchRecentMateriel(limit = 5): Promise<Materiel[]> {
  try {
    const res = await fetch(`${API_BASE}/materiel`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`Failed to fetch materiel: ${res.status}`);

    const items = (await res.json()) as Materiel[];
    const withDates = items.map((m) => ({ ...m }));
    withDates.sort((a, b) => {
      const da = a.created_at ? new Date(a.created_at).getTime() : 0;
      const db = b.created_at ? new Date(b.created_at).getTime() : 0;
      return db - da;
    });
    return withDates.slice(0, limit);
  } catch (e) {
    console.error(e);
    return [];
  }
}
