import Image from 'next/image'
import React from 'react'
import svg from "@/public/Vector.svg"
export  function Navbar() {
  return (
    <nav className='flex flex-row justify-between mx-4 my-2'>
        <h3 className={`font-poppins text-3xl text-black `} >Resumelo</h3>
        <button><Image src={svg} alt='Icono de menu' width={38} /></button>
    </nav>
  )
}
