import { Normal } from "../lib/types/types";
import styles from "./label.module.css";

function Label({ className = "", children, ...rest }: Normal) {
  return (
    <label className={`${styles.Label} ${className}`} {...rest}>
      {children}
    </label>
  );
}

export default Label;
