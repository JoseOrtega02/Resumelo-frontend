"use client"

import { useEffect } from "react"
import { FallbackProps, useErrorBoundary } from "react-error-boundary";

function Error(error:FallbackProps) {
   const { resetBoundary } = useErrorBoundary();
    useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
  <div className="flex justyfy-center flex-col w-1/2 mt-8 md:w-full md:px-8 mx-auto">
      <h1 className="font-ovo text-3xl text-red-400">Ha ocurrido un error insesperado :(</h1>
      <button onClick={()=>resetBoundary()} className="bg-accent text-white rounded-full drop-shadow-xs border-2 border-black  py-2 px-4 justify-center items-center md:flex">Intentar de nuevo</button>
    </div>
  )
}

export default Error
