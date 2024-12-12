import { Normal } from "@/app/lib/types/types";
import styles from "./styles/HorizontalRule.module.css";

function HorizontalRule({ className = "", children }: Normal) {
  if (children) {
    return (
      <div className={`${className} ${styles.Container}`}>
        <hr className={styles.HorizontalRule} />
        <span className={styles.Text}>{children}</span>
        <hr className={styles.HorizontalRule} />
      </div>
    );
  }

  return <hr className={`${styles.HorizontalRule} ${className}`} />;
}

export default HorizontalRule;
