"use client"
import React, { useState } from 'react'
import snapshot from "@/public/assets/OIP 2.svg"
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';
const summariesExample = [
    {
      id:"1",
      name:"Resumen 1",
        desc:"lorem impusnLorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Nulla vitae elit libero",
        cantLikes:6,
        created_at:"1/1/24",
        userId: 1,
        pdf_url: "https://github.com/py-pdf/sample-files/blob/main/001-trivial/minimal-document.pdf",
        snapshot: snapshot
    },  { id:"2",
      name:"Resumen 2",
        desc:"lorem impusnLorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Nulla vitae elit libero",
        cantLikes:6,
        created_at:"1/1/24",
        userId: 1,
        pdf_url: "https://github.com/py-pdf/sample-files/blob/main/001-trivial/minimal-document.pdf",
        snapshot: snapshot
    },  {
      id:"3",
      name:"Resumen 3",
        desc:"lorem impusnLorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Nulla vitae elit libero",
        cantLikes:6,
        created_at:"1/1/24",
        userId: 1,
        pdf_url: "https://github.com/py-pdf/sample-files/blob/main/001-trivial/minimal-document.pdf",
        snapshot: snapshot
    }
]
export interface Summary {
    id:string
    name: string; // Nombre del resumen
    desc: string; // Descripción del resumen
    cantLikes: number; // Cantidad de likes
    created_at: string; // Fecha de creación
    userId: number; // ID del usuario que creó el resumen
    pdf_url: string; // URL del PDF asociado
    snapshot: StaticImport ; // Tipo genérico para el snapshot (puedes ajustarlo si conoces su estructura)
  }
interface Props{
    summary:Summary
}
function Summary({summary}:Props){
    return <div className='flex flex-col rounded-lg overflow-hidden'>
        <div className="relative w-full h-48">
           <Image 
       src={summary.snapshot}
        
        alt="Picture of the author"
        layout="fill"
          objectFit="cover"
        /> 
        </div>
       
        <div className="p-4 bg-secondary">
        <h2 className="text-lg font-bold text-black">{summary.name}</h2>
        <div className="mt-4 flex items-center justify-between">
          <button className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
            Download
          </button>
          <button className="px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg">
            Like
          </button>
        </div>
      </div>
    </div>
}

export  function RenderSummaries() {
    const [summaries,setSummaries] = useState(summariesExample)
  return (
    <div className='px-4 mt-3 flex flex-col flex-wrap gap-4'>
        {summaries.map((summary,index)=>{
            return <Link href={`resumen/${summary.id}`} key={index}><Summary  summary={summary}/> </Link>
        })}
    </div>
  )
}
