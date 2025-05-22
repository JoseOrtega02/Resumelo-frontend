function ErrorToastComponent({message}:{message:string}) {
  return (
    <div className="bg-background p-4 border-red-400 rounded-xl border-2 border-solid text-red-400">
        <h3><span>&#128683; </span>{message}</h3>
    </div>
  )
}

function SuccessToastComponent({message}:{message:string}) {
  return (
    <div className="bg-background p-4 border-accent rounded-xl border-2 border-solid text-accent">
        <h3><span>&#x2713; </span>{message}</h3>
    </div>
  )
}






export  {ErrorToastComponent,SuccessToastComponent}
