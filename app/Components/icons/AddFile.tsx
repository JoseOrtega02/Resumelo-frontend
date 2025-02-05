import React from 'react'
import svg from "@/public/clipboard-add-svgrepo-com.svg"
import Image from 'next/image'
export  function AddFile() {
  return (
    <Image src={svg} alt="Icono crear archivo"/>
  )
}
