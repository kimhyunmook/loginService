import { Normal } from "@/app/lib/types/types";
import styles from "./styles/input.module.css";
import Image from "next/image";

type InputT = Normal & {
  password?: boolean;
};
function Input({ className = "", children, password, ...rest }: InputT) {
  return (
    <div className={`${styles.InputBox} ${className}`}>
      <input className={`${styles.Input}`} {...rest} />
      {password ? <Eye tri={rest.type} /> : null}
      {children}
    </div>
  );
}

function Eye({ tri }: { tri: "text" | "password" }) {
  const len = 20;
  return (
    <>
      {tri === "text" ? (
        <Image src="/img/look.svg" alt="eye" width={len} height={len} />
      ) : (
        <Image src="/img/look2.svg" alt="eye" width={len} height={len} />
      )}
    </>
  );
}

export default Input;
