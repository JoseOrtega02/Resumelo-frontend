"use client";
import React from "react";

import svg from "@/public/heart-svgrepo-com.svg";
import Image from "next/image";
import { useStore } from "../GlobalState/zustandStore";
interface Props {
  likes: number;
  summaryId: string;
}
function LikeButton({ likes, summaryId }: Props) {
  const userId = useStore((state) => state.user?.id);
  const handleLike = async (summaryId: string, userId: string) => {
    const body = {
      summaryId: summaryId,
      userId: userId,
    };
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/like",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // <-- Este header es necesario
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      alert("something went wrong");
      console.log(response);
    }
    console.log(response);
  };

  return (
    <>
      {userId ? (
        <button
          onClick={() => handleLike(summaryId, userId)}
          className="relative w-[60px] h-[60px]"
        >
          <h5 className="absolute inset-0 flex items-center justify-center text-white z-10 font-ovo text-lg">
            {likes}
          </h5>
          <Image src={svg} alt="icono de corazon" width={60} />
        </button>
      ) : (
        <>Login for give like</>
      )}
    </>
  );
}

export default LikeButton;
