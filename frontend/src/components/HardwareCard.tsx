import { ReactElement } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from 'next/image'

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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{nom}</CardTitle>
        <CardDescription>{type}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <Image
          src={image}
          width={250}
          height={250}
          alt="Hardware picture"
        />
        <p>
          <strong>Numéro de série:</strong> {numeroSerie}
        </p>
        <p>
          <strong>Marque:</strong> {marque}
        </p>
        <p>
          <strong>Valeur:</strong> {valeur}
        </p>
        <p>
          <strong>État:</strong> {etat}
        </p>
        <p>
          <strong>Emplacement:</strong> {emplacement}
        </p>
      </CardContent>
    </Card>
  );
}
