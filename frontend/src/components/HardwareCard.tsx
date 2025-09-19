import { ReactElement } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Barcode, Factory, DollarSign, MapPin, CheckCircle } from "lucide-react";

interface HardwareCardProps {
  nom: string;
  type: string;
  image: string;
  numeroSerie: string;
  marque: string;
  valeur: string;
  etat: string;
  emplacement: string;
}

export default function HardwareCard({
  nom,
  type,
  image,
  numeroSerie,
  marque,
  valeur,
  etat,
  emplacement,
}: HardwareCardProps): ReactElement {
  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-md hover:shadow-lg transition rounded-xl">
      <div className="w-full h-48 relative">
        <Image
          src={image}
          alt={nom}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{nom}</CardTitle>
        <CardDescription className="text-sm text-slate-500 dark:text-slate-500">
          {type}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <InfoRow icon={<Barcode className="h-4 w-4" />} label="Numéro de série" value={numeroSerie} />
        <InfoRow icon={<Factory className="h-4 w-4" />} label="Marque" value={marque} />
        <InfoRow icon={<DollarSign className="h-4 w-4" />} label="Valeur" value={valeur} />
        <InfoRow icon={<CheckCircle className="h-4 w-4" />} label="État" value={etat} />
        <InfoRow icon={<MapPin className="h-4 w-4" />} label="Emplacement" value={emplacement} />
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
      <span className="text-slate-500 dark:text-slate-400">{icon}</span>
      <span className="font-medium">{label}:</span>
      <span className="text-slate-700 dark:text-slate-800 truncate">{value}</span>
    </div>
  );
}
