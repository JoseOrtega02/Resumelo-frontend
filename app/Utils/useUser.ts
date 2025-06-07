import { useEffect } from "react";
import { useStore } from "../GlobalState/zustandStore";
export const useUser = () => {
  const user = useStore((state) => state.user);
  const checkUser = useStore((state) => state.checkUser);
  useEffect(() => {
    checkUser();
  }, []);
  return { user };
};
