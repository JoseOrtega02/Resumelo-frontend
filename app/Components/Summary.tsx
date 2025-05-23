import Link from "next/link";
import { ShowLikes } from "./ShowLikes";

export  interface ISummary {
  id: string;
  title: string; // Nombre del resumen
  desc: string; // Descripción del resumen
  likes: number; // Cantidad de likes
  liked: number;
  created_at: string; // Fecha de creación
  author: string; // ID del usuario que creó el resumen
  authorData: {
    name: string;
    email: string;
  };
  pdf: string; // URL del PDF asociado
  // snapshot: StaticImport; // Tipo genérico para el snapshot (puedes ajustarlo si conoces su estructura)
}

interface Props {
  summary: ISummary;
}

function Summary({ summary }: Props) {
  return (
    <div className="rounded-xl md:min-w-80 min-w-60 border-black border-solid border-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl p-2">
      <Link href={`resumen/${summary.id}`}>
        <div className="flex justify-between">
          <h2 className="md:text-6xl text-5xl font-ovo text-black">{summary.title}</h2>
          <ShowLikes likes={summary.likes} />
        </div>
        <p className="text-xl font-hind text-black my-2">{summary.desc}</p>
        <h4 className="text-xl font-ovo text-black mt-8 mb-2">
          Author: <span className="text-accent">{summary.authorData.name}</span>
        </h4>
      </Link>
    </div>
  );
}
export default Summary
