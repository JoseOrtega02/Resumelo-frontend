import React from 'react'
import svg from "@/public/uploadFile.svg"
import Image from 'next/image'

export function UploadFile() {
  return (
    <Image src={svg} alt='Icono subir archivo'/>
  )
}

