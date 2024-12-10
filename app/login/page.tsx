"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Label from "../components/label";
import Input from "../components/input";
import Button from "../components/button";
import HorizontalRule from "../components/horizontalRule";
import Link from "../components/link";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/authProvider";

function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  function handleChange(e: any) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const { email, password } = values;
    await login({ email, password }).then((res) => {
      if (res !== undefined) router.push("/");
    });
  }

  return (
    <>
      <h1 className={styles.Heading}>로그인</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        <Button className={styles.Button}>로그인</Button>
        <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
        <Button
          className={styles.GoogleButton}
          type="button"
          appearance="secondary"
          as={Link}
        >
          <img src={"/img/google.svg"} alt="Google" />
          구글로 시작하기
        </Button>
        <div className={styles.Footer}>
          회원이 아니신가요? <Link href="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;