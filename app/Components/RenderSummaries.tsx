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
  pdf: string; // URL del PDF asociado
  // snapshot: StaticImport; // Tipo genérico para el snapshot (puedes ajustarlo si conoces su estructura)
}
interface Props {
  summary: Summary;
}
function Summary({ summary }: Props) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden min-w-80">
      <div className="relative w-full h-48">
        {/* <Image
          src={summary.snapshot}
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
        /> */}
      </div>

      <div className="p-4 bg-secondary">
        <h2 className="text-3xl font-ovo text-black">{summary.title}</h2>
        <div className="mt-4 flex items-center justify-between">
          <button>
            <Image src={downloadIcon} alt="Icono de descarga" />
          </button>
          <button>
            <Image src={heartIcon} alt="Icono de Corazon" />
          </button>
        </div>
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
        <Link href={`resumen/${summary.id}`} key={index}>
          <Summary summary={summary} />
        </Link>
      ))}
    </div>
  );
}
