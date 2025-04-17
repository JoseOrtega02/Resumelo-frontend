"use client";
import downloadIcon from "@/public/archive-down-minimlistic-svgrepo-com(white).svg";
import Image from "next/image";
import React from "react";
interface Props {
  pdf: string;
  title: string;
  variant: "desktop" | "mobile";
}
export function DownloadButton({ pdf, title, variant }: Props) {
  const handleDownload = async (urlPdf: string, title: string) => {
    try {
      const res = await fetch(urlPdf);

      if (!res.ok) {
        throw new Error("Error al descargar el archivo");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = title; // nombre con el que se descargará
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al descargar el archivo:", err);
      alert("No se pudo descargar el archivo.");
    }
  };
  return (
    <button
      onClick={() => handleDownload(pdf, title)}
      className={
        variant == "desktop"
          ? "hidden bg-accent text-white rounded-full drop-shadow-xs border-2 border-black  py-2 px-4 justify-center items-center md:flex"
          : "bg-accent text-white rounded-full  fixed drop-shadow-xs border-2 border-black  bottom-3 left-3 p-2 md:hidden"
      }
    >
      <Image src={downloadIcon} width={42} alt="icono de descargar archivo" />
      Descargar
    </button>
  );
}
