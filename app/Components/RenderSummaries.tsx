import React from "react";
import Image from "next/image";
import downloadIcon from "@/public/archive-down-minimlistic-svgrepo-com.svg";
import heartIcon from "@/public/heart-svgrepo-com.svg";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { ShowLikes } from "./ShowLikes";
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
  return (
    <div className="rounded-xl min-w-80 border-black border-solid border-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl p-2">
      <Link href={`resumen/${summary.id}`}>
        <div className="flex justify-between">
          <h2 className="text-6xl font-ovo text-black">{summary.title}</h2>
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

export async function RenderSummaries({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = (await searchParams.q) ?? "";
  const url = query
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/search/${query}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary`;
  const res = await fetch(url, {
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
