/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./styles/InputUi.module.css";
import Label from "../label";
import Input from "../input";
import { HTMLInputTypeAttribute } from "react";
type InputBoxT = {
  id: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: any;
};
export default function InputUi({ id, type, value, onChange }: InputBoxT) {
  return (
    <div className={styles.InputUi}>
      <Label htmlFor={id}>이메일</Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder="이메일"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
