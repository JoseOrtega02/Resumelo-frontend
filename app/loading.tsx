import Image from "next/image";
import loadingGif from "@/public/Spinner@1x-2.6s-334px-334px.gif";
function Loading() {
  return (
    <div className="flex justify-center w-full">
      <Image src={loadingGif} alt="loading gif" />
    </div>
  );
}

export default Loading;
