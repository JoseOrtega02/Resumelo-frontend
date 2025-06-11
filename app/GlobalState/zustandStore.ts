import { create } from "zustand";
import { persist } from "zustand/middleware";
interface User {
  name: string;
  email: string;
  id: string;
}
interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  removeUser: () => void;
  checkUser: () => Promise<void>;
}
export const useStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
      checkUser: async () => {
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/login/checkUser",
            {
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          if (!res.ok) {
            throw new Error("Not Authenticated");
          }
          const data = await res.json();
          const user = {
            name: data.data.name,
            email: data.data.email,
            id: data.data.id,
          };
          set({ user });
        } catch (err) {
          console.log(err);
          set({ user: null });
        }
      },
    }),
    { name: "user-storage" },
  ),
);
