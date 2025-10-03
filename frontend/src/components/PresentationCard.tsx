import { ReactElement } from "react";

interface PresentationCardProps {
  title: string;
  description: string;
}

export default function PresentationCard({
  title,
  description
}: PresentationCardProps): ReactElement {
  return (
    <div className="p-6 bg-slate-300 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};
