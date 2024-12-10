"use client";
import { useState } from "react";
import Label from "../components/label";
import Input from "../components/input";
import Button from "../components/button";
import HorizontalRule from "../components/horizontalRule";
import Link from "../components/link";
import styles from "./page.module.css";
import { useToaster } from "../contexts/toasterProvider";
import { useRouter } from "next/navigation";
import { RegisterApi } from "../api/api";
import { useAuth } from "../contexts/authProvider";

/* eslint-disable @typescript-eslint/no-explicit-any */
function RegisterPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const toast = useToaster();
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

    if (values.password !== values.passwordRepeat) {
      toast("warn", "비밀번호가 일치하지 않습니다.");
      return;
    }
    const { name, email, password } = values;
    await RegisterApi({ name, email, password })
      .then(async (res) => {
        if (res.status === 409) {
          toast("warn", res.data);
          return;
        } else {
          await login({ email, password });
          router.push("/");
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  }

  return (
    <>
      <h1 className={styles.Heading}>회원가입</h1>
      <Button
        className={styles.GoogleButton}
        type="button"
        appearance="secondary"
        as={Link}
      >
        <img src={"/img/google.svg"} alt="Google" />
        구글로 시작하기
      </Button>
      <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="text"
          placeholder="김코드잇"
          value={values.name}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="example@email.com"
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
        <Label className={styles.Label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.Input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={values.passwordRepeat}
          onChange={handleChange}
        />
        <Button className={styles.Button}>회원가입</Button>
        <div className={styles.Footer}>
          이미 회원이신가요? <Link href="/login">로그인하기</Link>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
