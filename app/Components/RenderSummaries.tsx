"use client"
import React, { useState } from 'react'
import snapshot from "@/public/assets/OIP 2.svg"
import Image from 'next/image'
import downloadIcon from "@/public/archive-down-minimlistic-svgrepo-com.svg"
import heartIcon from "@/public/heart-svgrepo-com.svg"
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';
const summariesExample = [
    {
      id:"1",
      name:"Libro 1",
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
    },
    {
      id:"1",
      name:"Libro 1",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      cantLikes:6,
      created_at:"1/1/24",
      userId: 1,
      pdf_url: "https://github.com/py-pdf/sample-files/blob/main/001-trivial/minimal-document.pdf",
      snapshot: snapshot
    },  
    { id:"2",
      name:"Resumen 2",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      cantLikes:6,
      created_at:"1/1/24",
      userId: 1,
      pdf_url: "https://github.com/py-pdf/sample-files/blob/main/001-trivial/minimal-document.pdf",
      snapshot: snapshot
    },  
    {
      id:"3",
      name:"Resumen 3",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      cantLikes:6,
      created_at:"1/1/24",
      userId: 1,
      pdf_url: "https://github.com/py-pdf/sample-files/blob/main/001-trivial/minimal-document.pdf",
      snapshot: snapshot
    },
    {
      id:"4",
      name:"Resumen 4",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      cantLikes:10,
      created_at:"2/1/24",
      userId: 2,
      pdf_url: "https://example.com/pdf4.pdf",
      snapshot: snapshot
    },
    {
      id:"5",
      name:"Resumen 5",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      cantLikes:3,
      created_at:"3/1/24",
      userId: 3,
      pdf_url: "https://example.com/pdf5.pdf",
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
    return <div className='flex flex-col rounded-lg overflow-hidden min-w-80'>
        <div className="relative w-full h-48">
           <Image 
       src={summary.snapshot}
        
        alt="Picture of the author"
        layout="fill"
          objectFit="cover"
        /> 
        </div>
       
        <div className="p-4 bg-secondary">
        <h2 className="text-3xl font-ovo text-black">{summary.name}</h2>
        <div className="mt-4 flex items-center justify-between">
          <button >
            <Image src={downloadIcon} alt='Icono de descarga'/>
          </button>
          <button >
            <Image src={heartIcon} alt='Icono de Corazon'/>
          </button>
        </div>
      </div>
    </div>
}

export  function RenderSummaries() {
    const [summaries,setSummaries] = useState(summariesExample)
  return (
    <div className='px-4 mt-3 flex flex-wrap gap-4 mx-auto justify-center'>
        {summaries.map((summary,index)=>{
            return <Link href={`resumen/${summary.id}`} key={index}><Summary  summary={summary}/> </Link>
        })}
    </div>
  )
}
