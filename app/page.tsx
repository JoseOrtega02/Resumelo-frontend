import { RenderSummaries } from "./Components/RenderSummaries";


export default function Home() {
  return (
    <div className="">
      <div className="flex flex-row gap-3 w-full justify-center mt-6">
        <input type="text" className="bg-secondary border-black border-2 rounded-3xl"/>
        <button className="bg-accent border-black border-2 rounded-3xl">Search</button>
      </div>
      <RenderSummaries/>
      <button className="bg-accent text-white rounded-full  fixed drop-shadow-xs  bottom-3 right-3 px-6 py-4">
        +
      </button>
    </div>
  );
}
