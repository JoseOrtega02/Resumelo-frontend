import { RenderSummaries } from "@/app/Components/RenderSummaries";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // const { error, loading } = useUser();
  const { id } = await params;
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/user/" + id);
  // if (loading) return <>Loading...</>;

  if (!res.ok) return <>Something went wrong</>;

  const data = await res.json();
  const user = data.data;
  const date = new Date(user.created_at);
  return (
    <div className="max-w-5xl mx-auto">
      {user ? (
        <>
          <div className="bg-secondary rounded-lg w-11/12 mx-auto px-4 py-1 flex flex-col gap-3 max-w-4xl md:p-4 my-3">
            <div className="flex gap-2">
              <div className="text-black ">
                <h2 className="text-3xl font-ovo">{user?.name}</h2>
                <h4 className="text-sm font-hind">{user?.email}</h4>
                <h3 className="text-sm font-hind">
                  Ha estado aqui desde:{date.toISOString().split("T")[0]}{" "}
                </h3>
              </div>
            </div>
          </div>
          <h2 className="text-xl text-black font-ovo pl-3 my-3 max-w-5xl md:my-3">
            Resumenes Subidos:
          </h2>
          <RenderSummaries searchParams={{ q: undefined }} />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
