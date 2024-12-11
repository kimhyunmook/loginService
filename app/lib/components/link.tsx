import { Normal } from "../lib/types/types";
import styles from "./link.module.css";
// import { Link as BaseLink } from 'react-router-dom';
import BaseLink from "next/link";

type LnikT = Normal & {
  href: string;
};
function Link({
  className = "",
  appearance = "primary",
  children,
  href = "",
  ...rest
}: LnikT) {
  return (
    <BaseLink
      className={`${styles.Link} ${styles[appearance]} ${className}`}
      {...rest}
      href={href}
    >
      {children}
    </BaseLink>
  );
}

export default Link;
