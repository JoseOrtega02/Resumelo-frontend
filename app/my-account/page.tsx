"use client";
import React, { Suspense } from "react";
import EditIcon from "../Components/icons/EditIcon";
import LogOut from "../Components/icons/LogOut";
import { useRouter } from "next/navigation";
import { useStore } from "../GlobalState/zustandStore";
import { RenderAuthorSummaries } from "../Components/RenderAuthorSummaries";
import Loading from "../loading";
export default function Page() {
  const router = useRouter();
  // const { error, loading } = useUser();
  const user = useStore((state) => state.user);
  const clearState = useStore((state) => state.removeUser);
  const logOut = () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/login/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // <-- Este header es necesario
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        clearState();
        alert("Log out successfully");
        router.push("/");
      })
      .catch((error) => alert(error));
  };
  // if (loading) return <>Loading...</>;
  // if (error) return <>Something went wrong</>;
  if(!user?.id){
    return <>please login</>
  }
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-secondary rounded-lg w-11/12 mx-auto px-4 py-1 flex flex-col gap-3 max-w-4xl md:p-4 my-3">
        <div className="flex gap-2">
          <div className="text-black ">
            <h2 className="text-2xl font-ovo">{user?.name}</h2>
            <h4 className="text-sm font-hind">{user?.email}</h4>
          </div>
          <button>
            <EditIcon />
          </button>
        </div>
        <button
          onClick={logOut}
          className="ml-auto bg-red-700 rounded-xl px-2 py-1 text-white flex gap-2 justify-center items-center text-sm"
        >
          Cerrar sesion <LogOut />
        </button>
      </div>
      <h2 className="text-xl text-black font-ovo pl-3 my-3 max-w-5xl md:my-3">
        Resumenes Subidos:
      </h2>
      <Suspense fallback={<Loading/>}>
      <RenderAuthorSummaries authorId={user?.id}/>
      </Suspense>
    </div>
  );
}
