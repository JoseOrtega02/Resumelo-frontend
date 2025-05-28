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

    <Link href={"/editSummary/" + summaryId}>
      <EditIcon />
    </Link>
      ):(<></>)}

    </>
  );
};
