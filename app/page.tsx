"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useAuth } from "./lib/contexts/authProvider";
import LoginButton from "@/app/lib/components/loginButton";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {}, []);

  return (
    <div className={styles.page}>
      <Link className={styles.a} href="/register">
        회원가입
      </Link>
      <LoginButton href="/login" loginState={user} />
      <Link className={styles.a} href="/me">
        마이페이지
      </Link>
    </div>
  );
}
