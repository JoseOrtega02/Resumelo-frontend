"use client"
import toast from "react-hot-toast";
import { useStore } from "../GlobalState/zustandStore";
import { LoadingToastComponent, SuccessToastComponent } from "./ToastComponent";
import { useRouter } from "next/navigation";
import DeleteIcon from "./icons/DeleteIcon";

interface Props{
  authorId: string,
  summaryId:string
}
function DeleteButton({authorId,summaryId}:Props) {
  const userId = useStore((state) => state.user?.id);
  const router = useRouter()
  const handleDelete =async (summaryId:string) =>{
    toast.custom(()=> <LoadingToastComponent message="Deleting Summary"/>)
      await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/summary/" + summaryId,{
      method:"DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // <-- Este header es necesario
      },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        toast.custom(() => <SuccessToastComponent message={data.message}/>)
        router.push("/")
    })
    .catch((err) => console.log(err))
  }

  return (
  <>
    {userId == authorId ? (

        <button
          onClick={() => handleDelete(summaryId)}
          className="ml-auto bg-red-700 rounded-full px-2 py-1 text-white flex gap-2 justify-center items-center text-sm transition-transform transform hover:scale-110"
        >
          <DeleteIcon className="fill-current" width={42} />
          Delete
        </button>
    ):(<></>)}
</>
  )
}

export default DeleteButton
