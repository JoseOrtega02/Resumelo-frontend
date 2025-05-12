import React from "react";
import { HeartIcon } from "./HeartIcon";

export function ShowLikes({ likes }: { likes: number }) {
  return (
    <>
      <button className="relative w-[60px] h-[60px]">
        <h5
          className={`absolute inset-0 flex items-center justify-center  text-white z-10 font-ovo text-lg`}
        >
          {likes}
        </h5>
        <HeartIcon status={true} />
      </button>
    </>
  );
}
