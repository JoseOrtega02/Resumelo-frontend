import { useEffect, useState } from "react";
interface User {
  name: string;
  email: string;
  id: string;
}
export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/login/checkUser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) setUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
};
