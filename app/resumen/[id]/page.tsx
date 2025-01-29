"use client"
import React from 'react'
import {PdfViewer} from '@/app/Components/PdfViewer'
const summaryExample= {id:"1",
  name:"Resumen 1",
    desc:"lorem impusnLorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Nulla vitae elit libero",
    cantLikes:6,
    created_at:"1/1/24",
    userId: 1,
    pdf_url: "/minimal-document.pdf",
    }

export default function Resumen() {
  return (
    <div className='flex flex-col gap-4 px-2 justify-center items-center w-full'>
      <div className='bg-secondary rounded-3xl p-3 w-full flex flex-col gap-5'>
        <div className='flex justify-between'> 
<h1 className='text-lg'>{summaryExample.name}</h1>
<button>Like</button>
        </div>
       <p className='text-sm'>{summaryExample.desc}</p>
      </div>
      <PdfViewer url={summaryExample.pdf_url} />
      <button className="bg-accent text-white rounded-full  fixed drop-shadow-xs  bottom-3 left-3 px-6 py-4">!</button>
    </div>
  )
}
