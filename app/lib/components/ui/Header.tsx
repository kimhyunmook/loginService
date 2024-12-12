/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "../link";
import styles from "./styles/Header.module.css";
import LoginButton from "../loginButton";
import { useAuth } from "../../contexts/authProvider";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
type HeaderT = {
  style?: any;
  height: string | number;
};
export default function Header({ style, height }: HeaderT) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const noHeaderPath: string[] = ["/register", "/login"];
  const display = noHeaderPath.some((x) => x === pathname);
  useEffect(() => {
    console.log(pathname, display);
  }, []);
  if (!isLoading && !display) {
    return (
      <header
        id={"Header"}
        className={`${styles.Header}`}
        style={{ ...style, height }}
      >
        <nav className={styles.Gnb}>
          <div className={styles.Left}>
            {!user ? (
              <Link className={styles.a} href="/register">
                회원가입
              </Link>
            ) : (
              <Link className={styles.a} href="/me">
                마이페이지
              </Link>
            )}
            <LoginButton href="/login" loginState={user} />
          </div>
        </nav>
      </header>
    );
  }
}
