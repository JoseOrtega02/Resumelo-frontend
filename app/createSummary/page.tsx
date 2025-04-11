"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UploadFile } from "../Components/icons/UploadFile"; // Importa un icono de subida
import { AddFile } from "../Components/icons/AddFile";
import { useUser } from "../Utils/useUser";

interface Inputs {
  name: string;
  desc: string;
  pdfFile: FileList;
}

function Page() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<Inputs>();
  const [fileName, setFileName] = useState<string | null>(null);
  if (!user) {
    return <></>;
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();
    const file = data.pdfFile[0]; // Obtenemos el archivo subido

    formData.append("title", data.name);
    formData.append("desc", data.desc);
    formData.append("pdf", file);
    formData.append("author", user?.id);

    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/summary", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((errors) => console.error(errors));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-black font-poppins font-semibold text-2xl mx-4 my-9">
        Comparte tu resumen :)
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 justify-center px-3 my-2 max-w-96 md:max-w-lg mx-auto"
        encType="multipart/form-data"
      >
        {/* Nombre */}
        <label className="text-black font-hind">Nombre:</label>
        <input
          {...register("name", { required: true })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">
            Este campo es obligatorio
          </span>
        )}

        {/* Descripción */}
        <label className="text-black font-hind">Descripción:</label>
        <textarea
          {...register("desc")}
          className="bg-secondary border-black text-black border-2 rounded-3xl h-24 px-3 py-2 text-base"
        />

        {/* Subir Archivo */}
        <label className="text-black font-hind">Subir archivo PDF</label>

        <input
          type="file"
          accept="application/pdf"
          id="fileInput"
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setFileName(files[0].name);
              setValue("pdfFile", files); // 👈 Guarda el archivo en RHF
              trigger("pdfFile"); // 👈 Fuerza la validación del archivo
            }
          }}
        />
        <input
          type="hidden"
          {...register("pdfFile", {
            required: "El archivo es obligatorio",
            validate: {
              isPdf: (files) =>
                files?.[0]?.type === "application/pdf" ||
                "Solo se permiten archivos PDF",
              fileSize: (files) =>
                files?.[0]?.size < 5 * 1024 * 1024 ||
                "El archivo no debe superar los 5MB",
            },
          })}
        />
        {/* Botón personalizado para subir archivo */}
        <label
          htmlFor="fileInput"
          className="bg-secondary border-black border-2 border-dashed rounded-3xl h-24 px-3 py-8 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-100 transition"
        >
          <UploadFile />
          <span className="text-sm text-gray-600">
            {fileName ? `📄 ${fileName}` : "Selecciona un archivo PDF"}
          </span>
        </label>

        {/* Errores */}
        {errors.pdfFile && (
          <p className="text-red-500 text-sm mt-1">{errors.pdfFile.message}</p>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-accent  text-white font-hind px-4 py-2 rounded-full mt-4"
        >
          Publicar <AddFile />
        </button>
      </form>
    </div>
  );
}

export default Page;
