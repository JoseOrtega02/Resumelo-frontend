"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UploadFile } from "../Components/icons/UploadFile"; // Importa un icono de subida
import { AddFile } from "../Components/icons/AddFile";
import { useRouter } from "next/navigation";
import { useUser } from "../Utils/useUser";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import {
  ErrorToastComponent,
  SuccessToastComponent,
} from "../Components/ToastComponent";
import Loading from "../loading";

//interface Inputs {
//  name: string;
//  desc: string;
//  pdfFile: FileList;
//}

const schema = yup.object({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres"),

  desc: yup
    .string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres"),

  pdfFile: yup
    .mixed<FileList>()
    .required("El archivo PDF es obligatorio")
    .test("required", "El archivo PDF es obligatorio", (value) => {
      return value && value.length > 0;
    })
    .test("is-pdf", "El archivo debe ser un PDF", (value) => {
      return value && value[0]?.type === "application/pdf";
    })
    .test("fileSize", "El archivo no debe superar los 5MB", (value) => {
      return value && value[0]?.size <= 5 * 1024 * 1024;
    }),
});

type Inputs = yup.InferType<typeof schema>;

function Page() {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  if (!user) {
    router.push("/login");
    return null;
  }
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    const file = data.pdfFile[0]; // Obtenemos el archivo subido

    formData.append("title", data.name);
    formData.append("desc", data.desc);
    formData.append("pdf", file);
    formData.append("author", user?.id);

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/summary", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        toast.custom(() => <SuccessToastComponent message={data.message} />);
        setLoading(false);
        router.push("/resumen/" + data.data.id);
      })
      .catch((error) => {
        console.log(error);
        toast.custom(() => (
          <ErrorToastComponent message="Error creating summary" />
        ));
        setLoading(false);
      });
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

        <span className="text-red-500 text-sm">{errors.name?.message}</span>

        {/* Descripción */}
        <label className="text-black font-hind">Descripción:</label>
        <textarea
          {...register("desc")}
          className="bg-secondary border-black text-black border-2 rounded-3xl h-24 px-3 py-2 text-base"
        />

        <span className="text-red-500 text-sm">{errors.desc?.message}</span>
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
        <input type="hidden" {...register("pdfFile")} />
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
        <span className="text-red-500 text-sm">{errors.pdfFile?.message}</span>

        {/* Botón de envío */}
        <button
          type="submit"
          className={
            loading
              ? "flex justify-center items-center gap-2 border-2 border-solid border-black font-hind px-4 py-2 rounded-full mt-4"
              : "flex justify-center items-center gap-2 bg-accent  text-white font-hind px-4 py-2 rounded-full mt-4"
          }
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              {"Publicar"} <AddFile />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default Page;
