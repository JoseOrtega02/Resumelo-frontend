"use client";
import Image from "next/image";
import React, { useState } from "react";
import svg from "@/public/Vector.svg";
import closeSvg from "@/public/cross-circle-svgrepo-com 1.svg";
import Link from "next/link";
import LogInSvg from "@/public/user-svgrepo-com (1) 1.svg";
import RegisterSvg from "@/public/user-plus-rounded-svgrepo-com (1) 1.svg";
import { useUser } from "../Utils/useUser";
import HomeIcon from "./icons/HomeIcon";
import ClipboardIcon from "./icons/ClipboardIcon";
import UserIcon from "./icons/UserIcon";
import  UserPlusIcon  from "./icons/UserPlusIcon";
import UserIconLogin from "./icons/UserIconLogin";
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
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="bg-accent rounded-3xl border-2 border-black text-2xl text-background font-ovo flex justify-center items-center align-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 hover:bg-background hover:text-accent hover:border-accent"
          >
            <HomeIcon className="stroke-current" />
            Home
          </Link>
          <Link
            href="/createSummary"
            onClick={() => setOpen(false)}
            className="rounded-3xl border-2 border-black text-2xl text-black font-ovo flex justify-center items-center align-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 hover:text-accent hover:border-accent"
          >
            <ClipboardIcon className="stroke-current" />
            Create Summary
          </Link>
          {/* {loading && <h3>loading...</h3>} */}
          {user != null ? (
              <Link
                href="/my-account"
                onClick={() => setOpen(false)}
                className="rounded-3xl border-2 border-black text-2xl text-black font-ovo flex justify-center items-center align-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 hover:text-accent hover:border-accent"
              >
                <UserIcon className="fill-current" />
                {user?.name}
              </Link>
          ) : (
            <div className="flex gap-3">
              <Link href="/login">
                {" "}
                <button className="bg-alternative3 text-black font-hind px-4 py-2 rounded-full border-2 border-black flex items-center gap-2 transition-transform transform hover:scale-110 hover:text-black hover:border-black hover:bg-accent">
                  Log in{" "}
                    <UserIconLogin />
                </button>
              </Link>{" "}
              <Link href="/register">
                  <button className="bg-alternative1 text-white font-hind px-4 py-2 rounded-full border-2 border-black flex items-center gap-2 transition-transform transform hover:scale-110  hover:text-black hover:border-black hover:bg-accent">
                  Register{" "}
                    <UserPlusIcon />
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
        ${open ? "flex flex-col" : "hidden"
          } transition-transform duration-300 z-50 md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="p-2">
            <Image
              src={closeSvg}
              className="stroke-black"
              alt="Close menu icon"
              width={38}
            />
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col items-center justify-start py-8 gap-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="w-3/5 bg-accent rounded-3xl border-2 border-black text-2xl text-black font-ovo flex justify-center items-center align-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 hover:text-background hover:border-background"
          >
            <HomeIcon className="stroke-current" />
            Home
          </Link>
          <Link
            href="/createSummary"
            onClick={() => setOpen(false)}
            className="w-3/5 bg-accent rounded-3xl border-2 border-black text-2xl text-black font-ovo flex justify-center items-center align-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 hover:text-background hover:border-background"
          >
            <ClipboardIcon className="stroke-current" />
            Create Summary
          </Link>

          {user != null ? (
              <Link
                href="/my-account"
                onClick={() => setOpen(false)}
                className="w-3/5 bg-accent rounded-3xl border-2 border-black text-2xl text-black font-ovo flex justify-center items-center align-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 hover:text-background hover:border-background"
              >
                <UserIcon className="fill-current" />
                {user?.name}
              </Link>
          ) : (
            <div className="gap-3 w-full px-4">
              <Link href="/login">
                {" "}
                <button
                  onClick={() => setOpen(false)}
                  className="flex justify-center items-center gap-2 bg-background text-black font-hind px-4 py-2 rounded-full w-full mt-4 mx-auto border-2 border-black transition-transform transform hover:scale-110"
                >
                  Log in{" "}
                  <Image src={LogInSvg} width={32} alt="Iniciar Sesion Icono" />
                </button>
              </Link>{" "}
              <Link href="/register">
                <button
                  onClick={() => setOpen(false)}
                  className="flex justify-center items-center gap-2 bg-alternative1 text-black font-hind px-4 py-2 rounded-full w-full mt-4 mx-auto border-2 border-black transition-transform transform hover:scale-110"
                >
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
