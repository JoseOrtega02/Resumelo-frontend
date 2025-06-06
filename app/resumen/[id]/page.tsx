import React, { Suspense } from "react";
import { PdfViewer } from "@/app/Components/PdfViewer";
import { DownloadButton } from "./DownloadButton";
import LikeButton from "@/app/Components/LikeButton";
import Loading from "@/app/loading";
import Link from "next/link";
import DeleteButton from "@/app/Components/DeleteButton";
import { EditButton } from "@/app/Components/EditButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Resumen({ params }: PageProps) {
  const { id } = await params;
  //todo: make this a custom hook
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/summary/" + id,
    {
      credentials: "include",
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    return <>Something went wrong</>;
  }

  const data = await res.json();
  const summary = data.data;
  return (
    <div className="flex flex-col gap-4 px-2 justify-center items-center w-full md:max-w-5xl mx-auto">
      {summary ? (
        <>
          <div className="bg-secondary rounded-3xl p-3 w-full flex flex-col gap-5">
            <div className="flex justify-between">
              <h1 className="font-ovo text-3xl text-black">{summary.title}</h1>
              <div className="flex gap-4">
                <Suspense fallback={<Loading />}>
                  <LikeButton summaryId={summary.id} />
                </Suspense>
                <DownloadButton
                  variant="desktop"
                  pdf={summary.pdf}
                  title={summary.title}
                />
                <EditButton authorId={summary.author} summaryId={summary.id} />
                <DeleteButton
                  summaryId={summary.id}
                  authorId={summary.author}
                />
              </div>
            </div>
            <p className="text-sm font-hind text-black">{summary.desc}</p>
            <h4 className="text-xl font-ovo text-black mt-8 mb-2">
              Author:{" "}
              <Link className="text-accent" href={"/author/" + summary.author}>
                {summary.authorData.name}
              </Link>
            </h4>
          </div>
          <PdfViewer url={summary.pdf} />
          <DownloadButton
            variant="mobile"
            pdf={summary.pdf}
            title={summary.title}
          />
        </>
      ) : (
        <>Summary not found</>
      )}
    </div>
  );
}
