import { useState } from "react";
import { loginUser } from "@/lib/auth";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await loginUser(username, password);
      return response;
    } catch (error) {
      throw new Error(error?.message ?? "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
