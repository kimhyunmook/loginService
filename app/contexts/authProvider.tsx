"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";
import { Normal } from "../types/types";
import { getMeApi, LoginApi } from "../api/api";
import { useToaster } from "./toasterProvider";
type UserT = {
  id?: string;
  name?: string;
  email?: string;
};
type UserAuthT = {
  user: UserT | null;
  login: (credentials: LoginT) => Promise<void>;
  logout: () => Promise<void>;
  updateMe: (formData: any) => Promise<void>;
} | null;
const AuthContext = createContext<UserAuthT>(null);

type LoginT = {
  email: string;
  password: string;
};
export function AuthProvider({ children }: Normal) {
  const [user, setUser] = useState<UserT | null>(() => {
    const storeUser = localStorage.getItem("user");
    return storeUser ? JSON.parse(storeUser) : null;
  });

  //   const router = useRouter();
  const toast = useToaster();
  async function login({ email, password }: LoginT) {
    const data = await LoginApi({ email, password });
    if (!!data) {
      const user = await getMeApi();
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } else toast("warn", "Id 또는 Password를 확인해주세요");
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  async function updateMe(formData: any) {
    return formData;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateMe,
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
