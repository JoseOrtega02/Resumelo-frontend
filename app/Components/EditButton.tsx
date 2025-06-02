"use client"
import Link from "next/link";
import { useStore } from "../GlobalState/zustandStore";
import EditIcon from "./icons/EditIcon"
interface Props {
  summaryId: string;
  authorId: string;
}
export const EditButton = ({ summaryId, authorId }: Props) => {
  const userId = useStore((state) => state.user?.id)
  return (
    <>
      {userId == authorId ? (


<Link
  href={"/editSummary/" + summaryId}
  className="flex items-center justify-center px-4 py-2 border-solid border-2 border-black rounded-full text-black hover:text-accent hover:border-accent transition-transform transform hover:scale-110"
>
  <EditIcon className="fill-current block" width={42} />
  Edit
</Link>
      ):(<></>)}

    </>
  );
};
