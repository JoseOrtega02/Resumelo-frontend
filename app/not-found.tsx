import Link from "next/link";

function NotFound() {
  return (
    <div className=" w-full flex flex-col text-center items-center mt-8 gap-5">
      <h2 className="text-4xl text-ovo text-black">Pagina no existente :(</h2>
      <Link href="/">
        <button className="bg-accent rounded-3xl border-2 border-black text-2xl text-white font-ovo flex justify-center gap-2 px-6 py-2 transition-transform transform hover:scale-110 ">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
