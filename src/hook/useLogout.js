"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuthStore";
import useError from "@/hook/useError";

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth((state) => state.logout);
  const { showError } = useError();
  const router = useRouter();

  const logoutHandler = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (result?.status === 200) {
        logout();
        localStorage.removeItem("auth-storage");
        router.push("/");
      }
    } catch (err) {
      showError(err?.message || "Something went wrong.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { isLoggingOut, logoutHandler };
};

export default useLogout;
