"use client";

import LoginForm from "@/app/auth/login/page";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center   text-[#002A28]">
      <LoginForm />
    </div>
  );
}
