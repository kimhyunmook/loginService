import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/register">회원가입</Link>
      <Link href="/login">로그인</Link>
      <Link href="/myPage">마이페이지</Link>
    </div>
  );
}
