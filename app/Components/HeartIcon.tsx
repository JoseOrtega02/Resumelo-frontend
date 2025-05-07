import React from "react";
import svg from "@/public/heart-svgrepo-com.svg";
import emptySvg from "@/public/emptyHeart.svg";
import Image from "next/image";
interface Props {
  status: boolean;
}
export function HeartIcon(status: Props) {
  return (
    <>
      {status.status ? (
        <>
          <Image src={svg} alt="icono de corazon lleno" width={60} />
        </>
      ) : (
        <>
          <Image src={emptySvg} alt="icono de corazon vacio" width={60} />
        </>
      )}
    </>
  );
}
