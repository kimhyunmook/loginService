import { Normal } from "../types/types";
import styles from "./input.module.css";

function Input({ className = "", children, ...rest }: Normal) {
  return (
    <input className={`${styles.Input} ${className}`} {...rest}>
      {children}
    </input>
  );
}

export default Input;
