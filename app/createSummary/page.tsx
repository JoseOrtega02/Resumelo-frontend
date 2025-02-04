"use client"
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
interface Inputs{
    name: string,
    desc:string,
    pdfFile:FileList
}
function Page() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) =>  {
        const file = data.pdfFile[0]; // Obtenemos el archivo subido
      console.log("Archivo seleccionado:", file);
    }
    const selectedFile = watch("pdfFile");
  return (
    <>
<form onSubmit={handleSubmit(onSubmit)}>
<input defaultValue={"example"} {...register("name",{required:true})}/>
{errors.name && <span>Este campo es obligatorio</span>}
<input defaultValue={"lorem ipsun pihg´´a ahsleia "} {...register("desc")}/>

<label className="block mb-2 text-gray-700 font-semibold">
        Subir archivo PDF
      </label>
      <input
        type="file"
        accept="application/pdf"
        {...register("pdfFile", {
          required: "El archivo es obligatorio",
          validate: {
            isPdf: (files) =>
              files[0]?.type === "application/pdf" || "Solo se permiten archivos PDF",
            fileSize: (files) =>
              files[0]?.size < 5 * 1024 * 1024 || "El archivo no debe superar los 5MB",
          },
        })}
        className="w-full p-2 border rounded"
      />

      {errors.pdfFile && (
        <p className="text-red-500 text-sm mt-1">{errors.pdfFile.message}</p>
      )}

      {selectedFile && selectedFile.length > 0 && (
        <p className="mt-2 text-gray-600">📄 {selectedFile[0].name}</p>
      )}



<button type='submit' >Send</button>
</form>
    </>
  )
}

export default Page