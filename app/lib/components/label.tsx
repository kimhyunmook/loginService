import { Normal } from "@/app/lib/types/types";
import styles from "./styles/label.module.css";

function Label({ className = "", children, ...rest }: Normal) {
  return (
    <label className={`${styles.Label} ${className}`} {...rest}>
      {children}
    </label>
  );
}

export default Label;
