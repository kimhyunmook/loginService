/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Label from "@/app/lib/components/label";
import Input from "@/app/lib/components/input";
import Button from "@/app/lib/components/button";
import styles from "./styles/page.module.css";
import { useAuth } from "@/app/lib/contexts/authProvider";
import { InputChange, Submit } from "@/app/lib/types/types";
import { useRouter } from "next/navigation";

function EditPage() {
  const router = useRouter();
  const [values, setValues] = useState<{
    name: string | undefined;
    email: string | undefined;
  }>({
    name: "",
    email: "",
  });
  //   const navigate = useNavigate();
  const { user, updateMe } = useAuth();

  function handleChange(e: InputChange) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e: Submit) {
    e.preventDefault();
    const { name, email } = values;
    await updateMe({ name, email });
    router.push("/me");
  }

  useEffect(() => {
    if (user) {
      const { name, email } = user;
      setValues({
        name,
        email,
      });
    }
  }, [user]);

  return (
    <>
      <h1 className={styles.Heading}>프로필 편집</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="text"
          placeholder="이름"
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
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <Button className={styles.Button}>적용하기</Button>
      </form>
    </>
  );
}

export default EditPage;
