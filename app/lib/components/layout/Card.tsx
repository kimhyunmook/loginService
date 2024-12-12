import { Normal } from "@/app/lib/types/types";
import styles from "./styles/Card.module.css";
type CardT = Normal & {
  onClick?: React.ReactEventHandler;
};
function Card({ className = "", children, onClick }: CardT) {
  return (
    <div className={`${styles.Card} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
