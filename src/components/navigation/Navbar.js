"use client";
import React, { useMemo, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import Dropdown from "@/components/navigation/Dropdown";
import useLogout from "@/hook/useLogout";
import { useAuth } from "@/store/useAuthStore";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { user } = useAuth((state) => state.user);
  const { logoutHandler } = useLogout();

  const menu = useMemo(() => {
    const baseMenu = [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ];

    if (user && user?.role === "admin") {
      return [
        ...baseMenu,
        { name: "Dashboard", url: "/dashboard" },
        { name: "Customers", url: "/customers" },
        { name: "Users", url: "/users" },
        { name: "Transactions", url: "/transactions" },
        {
          name: "Profile",
          url: "/",
          dropdown: [
            { name: "Settings", url: "" },
            {
              name: "Logout",
              url: "#",
              onClick: (e) => {
                e.preventDefault();
                logoutHandler();
              },
            },
          ],
        },
      ];
    }

    if (user && user?.role === "user") {
      return [
        ...baseMenu,
        { name: "Dashboard", url: "/dashboard" },
        { name: "Bank Accounts", url: "/bank-accounts" },
        {
          name: "Profile",
          url: "/",
          dropdown: [
            { name: "Settings", url: "" },
            {
              name: "Logout",
              url: "#",
              onClick: (e) => {
                e.preventDefault();
                logoutHandler();
              },
            },
          ],
        },
      ];
    }

    return baseMenu;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <nav className="w-full bg-gray-800 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="#" className="">
              <div className="avatar">
                <div className="w-16 rounded">
                  {/* <img src="" /> */}
                  <h1 className="text-3xl text-white font-bold">SB</h1>
                </div>
              </div>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <RxCross1 className="text-white" />
                ) : (
                  <AiOutlineMenu className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={[
              "flex-1",
              "justify-self-center",
              "pb-3",
              "mt-8",
              "md:block",
              "md:pb-0",
              "md:mt-0",
              navbar ? "block" : "hidden",
            ].join(" ")}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {menu.map(({ name, url, dropdown }, index) => (
                <li key={index} className="text-white">
                  {dropdown ? (
                    <Dropdown name={name} dropdownItems={dropdown} />
                  ) : (
                    <Link href={url}>{name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
