import { Normal } from "../lib/types/types";
import styles from "./Button.module.css";

type ButtonT = Normal & {
  as?: React.ElementType;
};
function Button({
  className = "",
  appearance = "primary",
  children,
  as: AsComponent,
  ...rest
}: ButtonT) {
  if (AsComponent) {
    return (
      <AsComponent
        className={`${styles.Button} ${styles[appearance]} ${className}`}
        {...rest}
      >
        {children}
      </AsComponent>
    );
  }

  return (
    <button
      className={`${styles.Button} ${styles[appearance]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
