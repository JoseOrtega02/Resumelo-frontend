"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import svg from "@/public/Vector.svg"
import closeSvg from "@/public/cross-circle-svgrepo-com 1.svg"
import Link from 'next/link'

export function Navbar() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <nav className='flex flex-row justify-between mx-4 my-2'>
        <h3 className={`font-poppins text-3xl text-black`}>Resumelo</h3>
        <button onClick={() => setOpen(true)}>
          <Image src={svg} alt='Menu icon' width={38} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <nav className={`fixed top-0 left-0 w-full h-screen bg-accent text-white 
        ${open ? 'flex flex-col' : 'hidden'} transition-transform duration-300 z-50`}>
        
        {/* Close Button */}
        <div className='flex justify-end p-4'>
          <button onClick={() => setOpen(false)} className='p-2'>
            <Image 
              src={closeSvg} 
              alt='Close menu icon' 
              width={38} 
              
            />
          </button>
        </div>

        {/* Menu Links */}
        <div className='flex flex-col items-center justify-start py-8 flex gap-8'>
          <Link href="/" className='text-2xl hover:text-gray-200' onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/createSummary" className='text-2xl hover:text-gray-200' onClick={() => setOpen(false)}>
            Create Summary
          </Link>
          <Link href="/user" className='text-2xl hover:text-gray-200' onClick={() => setOpen(false)}>
            My Account
          </Link>
        </div>
        <button className="flex justify-center items-center gap-2 bg-background  text-black font-hind px-4 py-2 rounded-full w-3/4 mt-4 mx-auto border-2 border-black" >Log in</button>
        <button className="flex justify-center items-center gap-2 bg-alternative1  text-black font-hind px-4 py-2 rounded-full w-3/4 mt-4 mx-auto border-2 border-black" >Register</button>
      </nav>
    </>
  )
}