"use client";
import Image from "next/image";
import React, { useState } from "react";
import svg from "@/public/Vector.svg";
import closeSvg from "@/public/cross-circle-svgrepo-com 1.svg";
import Link from "next/link";
import LogInSvg from "@/public/user-svgrepo-com (1) 1.svg";
import RegisterSvg from "@/public/user-plus-rounded-svgrepo-com (1) 1.svg";
import HouseSvg from "@/public/home-white.svg.svg";
import ClipboardSvg from "@/public/clipboard-black.svg.svg";
import { useUser } from "../Utils/useUser";
export function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();
  // if (error) {
  //   alert("something went wrong with the user");
  // }
  return (
    <header className="max-w-[1024px] mx-auto px-4">
      <nav className="flex items-center justify-between py-4">
        <h3 className="font-poppins text-3xl text-black">Resumelo</h3>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">
            <button className="bg-accent rounded-3xl border-2 border-black text-2xl text-white font-ovo flex justify-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 ">
              <Image src={HouseSvg} width={28} alt="icono de casa" />
              Home
            </button>
          </Link>
          <Link href="/createSummary">
            <button className=" rounded-3xl border-2 border-black text-2xl text-black font-ovo flex justify-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 ">
              <Image
                src={ClipboardSvg}
                width={28}
                alt="icono de portapapeles"
              />
              Create Summary
            </button>
          </Link>
          {/* {loading && <h3>loading...</h3>} */}
          {user != null ? (
            <div>
              <Link href="/my-account" className="">
                <button className="bg-accent rounded-3xl border-2 border-black text-2xl text-white font-ovo flex justify-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 ">
                  <Image src={LogInSvg} width={28} alt="Usuario Icono" />
                  {user?.name}
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">
                {" "}
                <button className="bg-background text-black font-hind px-4 py-2 rounded-full border-2 border-black flex items-center gap-2 transition-transform transform hover:scale-110">
                  Log in{" "}
                  <Image src={LogInSvg} width={32} alt="Iniciar Sesion Icono" />
                </button>
              </Link>{" "}
              <Link href="/register">
                <button className="bg-accent text-white font-hind px-4 py-2 rounded-full border-2 border-black flex items-center gap-2 transition-transform transform hover:scale-110">
                  Register{" "}
                  <Image
                    src={RegisterSvg}
                    width={32}
                    alt="Crear Cuenta Icono"
                  />
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Image src={svg} alt="Menu icon" width={38} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <nav
        className={`fixed top-0 left-0 w-full h-screen bg-accent text-white 
        ${
          open ? "flex flex-col" : "hidden"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="p-2">
            <Image src={closeSvg} alt="Close menu icon" width={38} />
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col items-center justify-start py-8 gap-8">
          <Link href="/">
            <button onClick={() => setOpen(false)} className="bg-accent rounded-3xl border-2 border-black text-2xl text-black font-ovo flex justify-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 hover:text-background hover:border-background">
              <Image src={HouseSvg} width={28} alt="icono de casa" />
              Home
            </button>
          </Link>

          <Link href="/createSummary">
            <button onClick={() => setOpen(false)} className=" rounded-3xl border-2 border-black text-2xl text-black font-ovo flex justify-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 hover:text-background hover:border-background ">
              <Image
                src={ClipboardSvg}
                width={28}
                alt="icono de portapapeles"
              />
              Create Summary
            </button>
          </Link>

{user != null ? (
            <div>
              <Link href="/my-account" className="">
                <button onClick={() => setOpen(false)} className="bg-accent rounded-3xl border-2 border-black text-2xl text-white font-ovo flex justify-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 ">
                  <Image src={LogInSvg} width={28} alt="Usuario Icono" />
                  {user?.name}
                </button>
              </Link>
            </div>
          ) : (
            <div className="gap-3 w-full px-4">

              <Link href="/login">
                {" "}
                <button onClick={() => setOpen(false)} className="flex justify-center items-center gap-2 bg-background text-black font-hind px-4 py-2 rounded-full w-full mt-4 mx-auto border-2 border-black transition-transform transform hover:scale-110">
                  Log in{" "}
                  <Image src={LogInSvg} width={32} alt="Iniciar Sesion Icono" />
                </button>
              </Link>{" "}

              <Link href="/register">
                <button onClick={() => setOpen(false)} className="flex justify-center items-center gap-2 bg-alternative1 text-black font-hind px-4 py-2 rounded-full w-full mt-4 mx-auto border-2 border-black transition-transform transform hover:scale-110">
                  Register{" "}
                  <Image
                    src={RegisterSvg}
                    width={32}
                    alt="Crear Cuenta Icono"
                  />
                </button>
              </Link>
            </div>
          )}
          </div>

      </nav>
    </header>
  );
}
