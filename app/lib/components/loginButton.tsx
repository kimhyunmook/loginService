/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import styles from "./styles/loginButton.module.css";
import { useAuth } from "@/app/lib/contexts/authProvider";
import { useRouter } from "next/navigation";
type LoginButtonT = {
  href: string;
  loginText?: "로그인" | string;
  logoutText?: "로그아웃" | string;
  loginState: any;
  className?: string;
};

function LoginButton({
  href,
  loginText = "로그인",
  logoutText = "로그아웃",
  loginState,
  className,
}: LoginButtonT) {
  const router = useRouter();
  // if (loginState === undefined)
  //   throw new Error("LoginButton태그에 loginState를 추가하세요.");
  const { logout, isLoading } = useAuth();
  function loginHandle(e: any) {
    e.preventDefault();
    if (loginState) logout();
    else router.push(href);
  }
  if (!!isLoading)
    return (
      <Link
        onClick={loginHandle}
        className={`${styles.loginButton} ${className}`}
        href={href}
      >
        {loginState ? logoutText : loginText}
      </Link>
    );
  else
    return (
      <Link href={"#"} className={`${styles.loginButton} ${className}`}>
        로딩
      </Link>
    );
}
export default LoginButton;
