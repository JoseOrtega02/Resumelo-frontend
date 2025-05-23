import React from "react";
import Summary, { ISummary } from "./Summary";

export async function RenderSummaries({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = (await searchParams.q) ?? "";
  const url = query
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/search/${query}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary`;
  const res = await fetch(url, {
    next: { revalidate: 60 }, // ⚠️ o cache: 'force-cache' si no querés revalidación
  });
  const data = await res.json();
  console.log(data);
  return (
    <div className="px-4 mt-3 flex flex-wrap gap-4 mx-auto justify-center">
      {data.data?.length === 0 && <div>Not summaries found</div>}
      {data.data?.map((summary: ISummary, index: number) => (
        <Summary summary={summary} key={index} />
      ))}
    </div>
  );
}
