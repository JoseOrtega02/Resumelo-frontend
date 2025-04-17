import { useEffect } from "react";
import { useStore } from "../GlobalState/zustandStore";
// interface User {
//   name: string;
//   email: string;
//   id: string;
// }
export const useUser = () => {
  const user = useStore((state) => state.user);
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const checkUser = useStore((state) => state.checkUser);
  useEffect(() => {
    checkUser();
  }, []);
  return { user };
};
