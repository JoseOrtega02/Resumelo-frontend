"use client";
import React, { useEffect, useState } from "react";
import { PdfViewer } from "@/app/Components/PdfViewer";
import svg from "@/public/heart-svgrepo-com.svg";
import downloadIcon from "@/public/archive-down-minimlistic-svgrepo-com(white).svg";
import Image from "next/image";
import { Summary } from "@/app/Components/RenderSummaries";
import { useParams } from "next/navigation";

export default function Resumen() {
  const [summary, setSummary] = useState<Summary>();
  const { id } = useParams();
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
  //todo: make this a custom hook
  useEffect(() => {
    if (id) {
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/summary/" + id, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSummary(data.data);
        })
        .catch((error) => {
          alert(error);
          console.error(error);
        });
    }
  }, [id]);
  return (
    <div className="flex flex-col gap-4 px-2 justify-center items-center w-full md:max-w-5xl mx-auto">
      {summary ? (
        <>
          <div className="bg-secondary rounded-3xl p-3 w-full flex flex-col gap-5">
            <div className="flex justify-between">
              <h1 className="font-ovo text-3xl text-black">{summary.title}</h1>
              <div className="flex gap-4">
                <button>
                  {" "}
                  <Image src={svg} alt="icono de corazon" width={60} />
                </button>
                <button
                  onClick={() => handleDownload(summary.pdf, summary.title)}
                  className="hidden bg-accent text-white rounded-full drop-shadow-xs border-2 border-black  py-2 px-4 justify-center items-center md:flex"
                >
                  <Image
                    src={downloadIcon}
                    width={42}
                    alt="icono de descargar archivo"
                  />
                  Descargar
                </button>
              </div>
            </div>
            <p className="text-sm font-hind text-black">{summary.desc}</p>
          </div>
          <PdfViewer url={summary.pdf} />
          <button
            onClick={() => handleDownload(summary.pdf, summary.title)}
            className="bg-accent text-white rounded-full  fixed drop-shadow-xs border-2 border-black  bottom-3 left-3 p-2 md:hidden"
          >
            <Image
              src={downloadIcon}
              width={42}
              alt="icono de descargar archivo"
            />
          </button>
        </>
      ) : (
        <>Summary not found</>
      )}
    </div>
  );
}
