"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UploadFile } from "../Components/icons/UploadFile";// Importa un icono de subida
import { AddFile } from "../Components/icons/AddFile";

interface Inputs {
  name: string;
  desc: string;
  pdfFile: FileList;
}

function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const file = data.pdfFile[0]; // Obtenemos el archivo subido
    console.log("Archivo seleccionado:", file);
  };

  const selectedFile = watch("pdfFile");
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-black font-poppins font-semibold text-2xl mx-4 my-9">
        Comparte tu resumen :)
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 justify-center px-3 my-2 max-w-96 md:max-w-lg mx-auto">
        {/* Nombre */}
        <label className="text-black font-hind">Nombre:</label>
        <input
          {...register("name", { required: true })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />
        {errors.name && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}

        {/* Descripción */}
        <label className="text-black font-hind">Descripción:</label>
        <textarea {...register("desc")}  className="bg-secondary border-black text-black border-2 rounded-3xl h-24 px-3 py-2 text-base" />

        {/* Subir Archivo */}
        <label className="text-black font-hind">Subir archivo PDF</label>

        <input
          type="file"
          accept="application/pdf"
          id="fileInput"
          className="hidden"
          {...register("pdfFile", {
            required: "El archivo es obligatorio",
            validate: {
              isPdf: (files) =>
                files[0]?.type === "application/pdf" || "Solo se permiten archivos PDF",
              fileSize: (files) =>
                files[0]?.size < 5 * 1024 * 1024 || "El archivo no debe superar los 5MB",
            },
          })}
          onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
        />

        {/* Botón personalizado para subir archivo */}
        <label
          htmlFor="fileInput"
          className="bg-secondary border-black border-2 border-dashed rounded-3xl h-24 px-3 py-8 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition"
        >
          <UploadFile/>
          <span className="text-sm text-gray-600">
            {fileName ? `📄 ${fileName}` : "Selecciona un archivo PDF"}
          </span>
        </label>

        {/* Errores */}
        {errors.pdfFile && <p className="text-red-500 text-sm mt-1">{errors.pdfFile.message}</p>}

        {/* Botón de envío */}
        <button type="submit" className="flex justify-center items-center gap-2 bg-accent  text-white font-hind px-4 py-2 rounded-full mt-4">
          Publicar <AddFile/>
        </button>
      </form>
    </div>
  );
}

export default Page;