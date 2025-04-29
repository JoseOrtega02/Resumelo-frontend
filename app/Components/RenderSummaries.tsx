import React from "react";
import Image from "next/image";
import downloadIcon from "@/public/archive-down-minimlistic-svgrepo-com.svg";
import heartIcon from "@/public/heart-svgrepo-com.svg";
import Link from "next/link";
export interface Summary {
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
  summary: Summary;
}
function Summary({ summary }: Props) {
  console.log(summary);
  return (
    <div className="rounded-xl min-w-80 border-black border-solid border-4">
      <Link href={`resumen/${summary.id}`}>
        <div className="p-4 pb-8">
          <h2 className="text-5xl font-ovo text-black">{summary.title}</h2>
          <h4 className="text-xl font-ovo text-black">
            by: <span className="text-accent">{summary.authorData.name}</span>
          </h4>
        </div>
      </Link>
      <div className="p-4 border-t-2 border-black border-solid w-full flex items-center justify-between">
        <button className="flex bg-accent rounded-[28px] border-solid border-black border-2 px-4 py-2 justify-center items-center text-white">
          <Image src={downloadIcon} alt="Icono de descarga" />
          Descargar
        </button>
        <button>
          <Image src={heartIcon} width={60} alt="Icono de Corazon" />
        </button>
      </div>
    </div>
  );
}

export async function RenderSummaries() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/summary`, {
    next: { revalidate: 60 }, // ⚠️ o cache: 'force-cache' si no querés revalidación
  });
  const data = await res.json();
  return (
    <div className="px-4 mt-3 flex flex-wrap gap-4 mx-auto justify-center">
      {data.data?.length === 0 && <div>Not summaries found</div>}
      {data.data?.map((summary: Summary, index: number) => (
        <Summary summary={summary} key={index} />
      ))}
    </div>
  );
}
