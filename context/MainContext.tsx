/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useEffect, useState } from "react";
import { getUserInfo } from "@/app/services/user";
import { IContextReturnType } from "./mainContext.type";
import { useRouter } from "next/navigation";
import { logout } from "@/app/services/auth";

export const Context = createContext<IContextReturnType>({
  user: null,
  isLoggedIn: true,
  updateUserInfo: () => {},
  handleLogout: () => {},
});

export function MainProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const updateUserInfo = async () => {
    try {
      const res = await getUserInfo();
      setUser(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await updateUserInfo();
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    console.log("Logout clicked");
    try {
      await logout(); // from auth service
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const isLoggedIn = !!user;

  return (
    <Context.Provider
      value={{ user, isLoggedIn, updateUserInfo, handleLogout }}
    >
      {children}
    </Context.Provider>
  );
}
