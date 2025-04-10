"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Checkbox from "@/components/CheckBox";
import Alert from "@/components/Alert";
import { useAuth } from "@/store/useAuthStore";
import useError from "@/hook/useError";
import useLogin from "@/hook/useLogin";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth((state) => state.setUser);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;
  const { error, isVisible, showError, hideError } = useError();
  const { login, isLoading } = useLogin();

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }, []);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showError("Username and password are required.");
      return;
    }

    try {
      const response = await login(username, password);
      if (response?.success) {
        setUser({
          username: response?.data?.username,
          id: response?.data?.user_id,
          role: response?.data?.role,
        });

        showError(null);
        hideError();
        router.push("/dashboard");
      }
    } catch (error) {
      showError(error?.message);
    }
  };

  return (
    <>
      {isVisible && error && (
        <div className="absolute top-0 right-0 m-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => hideError()}
          >
            <Alert message={error} type="error" />
          </motion.div>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center   text-[#002A28]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card w-96 bg-white shadow-2xl p-8 rounded-lg border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-[#002A28]">
            Masuk ke Superbank
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              label="Username"
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <div className="flex justify-between items-center mb-4">
              <Checkbox label="Ingat saya" />
              <a href="#" className="text-sm text-[#00443f] hover:underline">
                Lupa password?
              </a>
            </div>

            <Button
              type="submit"
              label={isLoading ? "Loading..." : "Masuk"}
              disabled={isLoading}
            />
          </form>

          <p className="text-center text-sm mt-4 text-[#002A28]">
            Belum punya akun?
            <a
              href="#"
              className="text-[#00443f] font-semibold hover:underline"
            >
              Daftar sekarang
            </a>
          </p>
        </motion.div>
      </div>
    </>
  );
}
