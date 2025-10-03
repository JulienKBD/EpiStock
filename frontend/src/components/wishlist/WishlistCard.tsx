import { ReactElement } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Factory, DollarSign } from "lucide-react";

interface WishlistCardProps {
  name: string;
  image: string;
  marque: string;
  valeur: string;
}

export default function WishlistCard({
  name,
  image,
  marque,
  valeur,
}: WishlistCardProps): ReactElement {
  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-md hover:shadow-lg transition rounded-xl bg-slate-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <CardDescription>Souhait utilisateur</CardDescription>
      </CardHeader>

      <div className="w-full h-48 relative">
        <Image
          src={image}
          alt={name || "Wishlist item"}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      <CardContent className="space-y-3 text-sm">
        <InfoRow icon={<Factory className="h-4 w-4" />} label="Marque" value={marque || "Inconnu"} />
        <InfoRow icon={<DollarSign className="h-4 w-4" />} label="Valeur" value={valeur || "0€"} />
      </CardContent>
    </Card>
  );
}

function InfoRow({
    icon,
    label,
    value,
  }: {
    icon: ReactElement;
    label: string;
    value: string;
  }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <span className="text-slate-500">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span className="text-slate-700 dark:text-slate-800 truncate">{value}</span>
    </div>
  );
}
