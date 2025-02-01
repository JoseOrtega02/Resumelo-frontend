import Image from "next/image";
import { RenderSummaries } from "./Components/RenderSummaries";
import { SearchBar } from "./Components/SearchBar";
import svg from "@/public/add-circle-svgrepo-com.svg"

export default function Home() {
  return (
    <div className="">
      <SearchBar/>
      <RenderSummaries/>
      <button className=" fixed drop-shadow-xs  bottom-3 right-1">
        <Image src={svg} width={66} alt="Icono de Creacion"/>
      </button>
    </div>
  );
}
