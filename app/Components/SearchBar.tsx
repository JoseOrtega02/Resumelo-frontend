"use client";
import Image from "next/image";
import React, { useState } from "react";
import svg from "@/public/rounded-magnifer-svgrepo-com (1).svg";
import { useRouter } from "next/navigation";
export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`?q=${encodeURIComponent(query)}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-3  max-w-5xl justify-center mt-6 md:my-6 "
    >
      <input
        type="text"
        className="bg-secondary border-black border-2 rounded-3xl px-3 md:w-96"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button >
        <Image src={svg} alt="Icono de lupa" className="transition-transform transform hover:scale-110"/>
      </button>
    </form>
  );
}
