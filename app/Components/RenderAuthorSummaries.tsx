"use client"; 

import { useEffect, useState } from "react";
import Summary, { ISummary } from "./Summary";
import Loader from "./Loader/Loader";

interface Props {
  authorId: string;
}

export function RenderAuthorSummaries({ authorId }: Props) {
  const [summaries, setSummaries] = useState<ISummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/summary/author/${authorId}`;
        const res = await fetch(url);
        const json = await res.json();
        setSummaries(json.data);
      } catch (err) {
        console.log(err)
        setError("Error al cargar los resúmenes.");
      }
    };

    fetchSummaries();
  }, [authorId]);

  if (error) return <p>{error}</p>;
  if (summaries === null) return <div className="px-4 mt-3 flex flex-wrap gap-4 mx-auto justify-center"><Loader/></div>;

  return (
    <div className="px-4 mt-3 flex flex-wrap gap-4 mx-auto justify-center">
      {summaries.length === 0 ? (
        <h3>El usuario no tiene Resumenes</h3>
      ) : (
        summaries.map((summary, index) => (
          <Summary summary={summary} key={index} />
        ))
      )}
    </div>
  );
}

