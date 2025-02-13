"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
        {errors.name && (
          <span className="text-red-500 text-sm">Este campo es obligatorio</span>
        )}

        <label className="text-black font-hind">Email:</label>
        <input
          {...register("email", { required: true })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">Este campo es obligatorio</span>
        )}

        <label className="text-black font-hind">Contraseña:</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            La contraseña debe tener al menos 6 caracteres
          </span>
        )}

        <label className="text-black font-hind">Confirmar Contraseña:</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
          })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

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
