/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "../link";
import styles from "./styles/Header.module.css";
import LoginButton from "../loginButton";
import { useAuth } from "../../contexts/authProvider";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMeApi, UserT } from "@/app/lib/api/api";
import { QUERY } from "../../value";

type HeaderT = {
  style?: any;
  height: string | number;
};
export default function Header({ style, height }: HeaderT) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const noHeaderPath: string[] = ["/register", "/login"];
  const display = noHeaderPath.some((x) => x === pathname);

  const { data: userInfo }: { data?: UserT } = useQuery({
    queryKey: [QUERY.UESR_INFO],
    queryFn: () => getMeApi(),
    staleTime: 60 * 1000 * 60,
    enabled: !!user,
  });

  if (!display && user) {
    return (
      <header
        id={"Header"}
        className={`${styles.Header}`}
        style={{ ...style, height }}
      >
        <nav className={styles.Gnb}>
          <div className={styles.right}>
            <Link className={styles.a} href="/">
              로고
            </Link>
          </div>
          <div className={styles.Left}>
            {!userInfo ? (
              <Link className={styles.a} href="/register">
                회원가입
              </Link>
            ) : (
              <div className={styles.nameTag}>
                <p>
                  {user.name} <span>님</span>
                </p>
                <Link className={styles.a} href="/me">
                  마이페이지
                </Link>
              </div>
            )}
            <LoginButton href="/login" loginState={userInfo} />
          </div>
        </nav>
      </header>
    );
  }
}
