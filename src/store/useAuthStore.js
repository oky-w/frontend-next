import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: [],
      setUser: (user) => set({ user }),
      logout: () =>
        set({ user: null, isLoading: { users: false, logout: false } }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;

export const useAuth = () => useAuthStore((state) => state);
