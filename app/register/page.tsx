"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ErrorToastComponent,
  SuccessToastComponent,
} from "../Components/ToastComponent";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



const schema = yup.object({
  name: yup
    .string()
    .max(20, "El nombre no puede superar los 20 caracteres")
    .min(3, "El nombre debe de contener al  menos 3 caracteres")
    .matches(
      /^(?!.*[_.]{2})[a-zA-Z0-9](?!.*[^\w.])[a-zA-Z0-9._]{1,28}[a-zA-Z0-9]$/,
      "Nombre inválido",
    )
    .required("Este campo es obligatorio"),

  email: yup
    .string()
    .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Email inválido")
    .required("Este campo es obligatorio"),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/]).{8,}$/,
      "Contraseña débil, debe de contener al menos una mayuscula, un caracter especial y tener minimo 6 caracteres",
    )
    .required("Este campo es obligatorio"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Este campo es obligatorio"),
});

 type Inputs = yup.InferType<typeof schema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const onSubmit = (data: Inputs) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/user";
    fetch(url || "", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // <-- Este header es necesario
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.custom(() => (
          <SuccessToastComponent message="Usuario creado correctamente" />
        ));
        router.push("/login");
      })
      .catch((err) => {
        toast.custom(() => (
          <ErrorToastComponent message="Error al iniciar sesion" />
        ));
        console.log(err);
      });
  };

  return (
    <div className="max-w-screen-md mx-auto px-4">
      <h2 className="text-black font-poppins font-semibold text-2xl mx-4 my-8">
        Crea una cuenta
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4  p-6 rounded-lg max-w-lg mx-auto"
      >
        <label className="text-black font-hind">Nombre:</label>
        <input
          {...register("name", { required: true })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />

          <span className="text-red-500 text-sm">
          {errors.name?.message}
          </span>

        <label className="text-black font-hind">Email:</label>
        <input
          {...register("email", { required: true })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />
          <span className="text-red-500 text-sm">
          {errors.email?.message}
          </span>

        <label className="text-black font-hind">Contraseña:</label>
        <input
          type="password"
          {...register("password", { required: true})}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />

          <span className="text-red-500 text-sm">
          {errors.password?.message}
          </span>
        <label className="text-black font-hind">Confirmar Contraseña:</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: true,
          })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />
          <span className="text-red-500 text-sm">
          {errors.confirmPassword?.message}
          </span>

        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-accent text-white font-hind px-4 py-2 rounded-full mt-4"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
