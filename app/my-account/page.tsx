"use client";
import React from "react";
import { RenderSummaries } from "../Components/RenderSummaries";
import EditIcon from "../Components/icons/EditIcon";
import LogOut from "../Components/icons/LogOut";
import { useUser } from "../Utils/useUser";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const { user, error, loading } = useUser();

  const logOut = async () => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/login/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Log out successfully");
        router.push("/");
      })
      .catch((error) => alert(error));
  };
  if (loading) return <>Loading...</>;
  if (error) return <>Something went wrong</>;
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
      <RenderSummaries />
    </div>
  );
}
