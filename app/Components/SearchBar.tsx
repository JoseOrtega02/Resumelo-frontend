import Image from 'next/image'
import React from 'react'
import svg from "@/public/rounded-magnifer-svgrepo-com (1).svg"
export  function SearchBar() {
  return (
    <div className="flex flex-row gap-3 w-full justify-center mt-6">
        <input type="text" className="bg-secondary border-black border-2 rounded-3xl px-3"/>
        <button><Image src={svg}  alt='Icono de lupa'/></button>
      </div>
  )
}
