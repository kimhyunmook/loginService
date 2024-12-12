"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { Normal } from "@/app/lib/types/types";
import { getMeApi, LoginApi } from "@/app/lib/api/api";
import { useToaster } from "./toasterProvider";
import { useRouter } from "next/navigation";
import instance from "../api/instance";
type UserT = {
  id?: string;
  name?: string;
  email?: string;
};
type UserAuthT = {
  user: UserT | null;
  avatar: null;
  login: (credentials: LoginT) => Promise<void>;
  logout: () => Promise<void>;
  updateMe: (formData: any) => Promise<void>;
  isLoading: boolean;
} | null;
const AuthContext = createContext<UserAuthT>(null);

type LoginT = {
  email: string;
  password: string;
};
export function AuthProvider({ children }: Normal) {
  const [user, setUser] = useState<UserT | null>(null);
  const [avatar, setAvatar] = useState<null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setUser(() => {
      const storeUser = localStorage.getItem("user");
      setIsLoading(false);
      return storeUser ? JSON.parse(storeUser) : null;
    });
  }, []);
  async function getMyAvatar() {
    const res = await instance.get("/users/me/avatar");
    const avatar = res.data;
    setAvatar(avatar);
  }
  useEffect(() => {
    getMyAvatar();
  }, []);
  const router = useRouter();
  const toast = useToaster();
  async function login({ email, password }: LoginT) {
    const data = await LoginApi({ email, password });
    if (!!data) {
      const user = await getMeApi();
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast("info", "로그인 성공했습니다.");
      router.push("/");
    } else toast("warn", "Id 또는 Password를 확인해주세요");
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("user");
    toast("info", "로그아웃 되었습니다.");
  }

  async function updateMe(formData: any) {
    return formData;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        avatar,
        login,
        logout,
        updateMe,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider 안에서 사용해야합니다.");
  }
  return context;
}
