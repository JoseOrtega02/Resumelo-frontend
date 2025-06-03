import Summary, { ISummary } from "./Summary";

export async function RenderSummaries({
  searchParams,
}: {
  searchParams: { q?: string,page?:string };
}) {

const page = searchParams.page ?? "1";
const query = searchParams.q ?? "";
const url = query
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/search/${query}`
  : `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary?page=${page}`;
  const res = await fetch(url, {
    next: { revalidate: 60 }, // ⚠️ o cache: 'force-cache' si no querés revalidación
  });
  const data = await res.json();
  return (
    <>

    <div className="px-4 mt-3 flex flex-wrap gap-4 mx-auto justify-center">
      {data.data?.length === 0 && <div>Not summaries found</div>}
      {data.data?.map((summary: ISummary, index: number) => (
        <Summary summary={summary} key={index} />
      ))}
    </div>

    {data.pagination ? <div className="flex justify-center mt-4 text-2xl my-8 gap-2 text-accent font-ovo">
      {data?.pagination?.previousPage && (
        <a href={`?page=${data?.pagination?.previousPage}`}>{"<"}Previous</a>
      )}
      <span className='text-black'>
        Page {data?.pagination?.page} of {data?.pagination?.totalPages}
      </span>
      {data?.pagination?.nextPage && (
        <a href={`?page=${data?.pagination?.nextPage}`}>Next {">"}</a>
      )}
    </div>: <></>}
    
    </>
  );
}
