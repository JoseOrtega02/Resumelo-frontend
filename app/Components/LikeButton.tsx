"use client";
import React, { useEffect, useState } from "react";

import { useStore } from "../GlobalState/zustandStore";
import { HeartIcon } from "./HeartIcon";
interface Props {
  summaryId: string;
}
function LikeButton({ summaryId }: Props) {
  const [likes,setLikes] = useState<number>(0)
  const userId = useStore((state) => state.user?.id);
  const [status, setStatus] = useState<boolean>(false);
  const handleLike = async (
    summaryId: string,
    userId: string,
    status: boolean
  ) => {
    const body = {
      summaryId: summaryId,
      userId: userId,
    };
    let url = process.env.NEXT_PUBLIC_BACKEND_URL + "/like";
    let params: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // <-- Este header es necesario
      },
      body: JSON.stringify(body),
    };
    if (status) {
      url =
        process.env.NEXT_PUBLIC_BACKEND_URL + `/like/${summaryId}&${userId}`;
      params = {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // <-- Este header es necesario
        },
      };
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      alert("something went wrong");
      console.log(response);
      console.log(status);
    }
    const data = await response.json()
    setStatus(data.data.likeStatus)
    console.log(data);
  };

  useEffect(() => {
    console.log(userId)
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/like/${summaryId}&${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLikes(data.data.likes)
        console.log("response from the server: " + data.data.likedByUser)
        setStatus(Boolean(data.data.likedByUser));
      })
      .catch((err) => console.error(err));
  });
  return (
    <>
      {userId ? (
        <button
          onClick={() => handleLike(summaryId, userId, status)}
          className="relative w-[60px] h-[60px]
          transition-transform transform hover:scale-110 "
        >
          <h5
            className={`absolute inset-0 flex items-center justify-center ${
              status ? "text-white" : "text-black"
            } z-10 font-ovo text-lg `}
          >
            {likes}
          </h5>
          <HeartIcon status={status} />
        </button>
      ) : (
        <>Login for give like</>
      )}
    </>
  );
}

export default LikeButton;
