import { Normal } from "@/app/lib/types/types";
import styles from "./styles/input.module.css";

function Input({ className = "", children, ...rest }: Normal) {
  console.log(rest);
  return (
    <div className={`${styles.InputBox} ${className}`}>
      <input className={`${styles.Input}`} {...rest} />
      {children}
    </div>
  );
}

export default Input;
