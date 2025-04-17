"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "../GlobalState/zustandStore";

interface Inputs {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const checkUser = useStore((state) => state.checkUser);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const body = {
      email: data.email,
      password: data.password,
    };
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/login";

    await fetch(url || "", {
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
        alert("Sesion iniciada correctamente");
        checkUser();
        router.push("/");
      })
      .catch((err) => {
        alert("something went grong: " + err);
        console.log(err);
      });
  };

  return (
    <div className="max-w-screen-md mx-auto px-4">
      <h2 className="text-black font-poppins font-semibold text-2xl text-start my-9">
        Inicia Sesión en tu cuenta
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4  p-6 rounded-lg max-w-lg mx-auto"
      >
        <label className="text-black font-hind">Email:</label>
        <input
          {...register("email", { required: true })}
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">
            Este campo es obligatorio
          </span>
        )}

        <label className="text-black font-hind">Contraseña:</label>
        <input
          {...register("password", { required: true })}
          type="password"
          className="bg-secondary border-black text-black border-2 rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            Este campo es obligatorio
          </span>
        )}

        <button
          type="submit"
          className="bg-accent text-white font-hind px-4 py-2 rounded-full mt-4 hover:bg-accent-dark transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
