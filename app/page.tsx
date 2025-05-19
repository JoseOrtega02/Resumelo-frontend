import Image from "next/image";
import { RenderSummaries } from "./Components/RenderSummaries";
import { SearchBar } from "./Components/SearchBar";
import svg from "@/public/add-circle-svgrepo-com.svg";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import Error from "./error";
import { ErrorBoundary } from "react-error-boundary";
export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = await searchParams;
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center items-middle gap-7 w-full md:w-auto">
        <SearchBar />
        <Link href="createSummary" className="hidden md:flex">
          <button className="hidden md:flex">
            <Image src={svg} width={68} alt="Icono de Creacion" />
          </button>
        </Link>
      </div>
      <Suspense fallback={<Loading/>}>
        <ErrorBoundary FallbackComponent={Error}>

      <RenderSummaries searchParams={query} />
        </ErrorBoundary>
      </Suspense>
      <Link href="createSummary" className="flex md:hidden">
        <button className="fixed bottom-3 right-1">
          <Image src={svg} width={68} alt="Icono de Creacion" />
        </button>
      </Link>
    </div>
  );
}
