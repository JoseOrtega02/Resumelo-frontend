import { RenderSummaries } from "./Components/RenderSummaries";
import { SearchBar } from "./Components/SearchBar";
import { Suspense } from "react";
import Loading from "./loading";
import Error from "./error";
import { ErrorBoundary } from "react-error-boundary";
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Resumelo',
}


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string,page?:string }>;
}) {
  const query = await searchParams;
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-center items-middle gap-7 w-full md:w-auto">
        <SearchBar />
      </div>
      <Suspense fallback={<Loading/>}>
        <ErrorBoundary FallbackComponent={Error}>

      <RenderSummaries searchParams={query} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
