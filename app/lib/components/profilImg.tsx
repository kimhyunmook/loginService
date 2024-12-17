import styles from "./styles/profilImg.module.css";
import Image from "next/image";
export default function ProfilImg() {
  const { width, height } = { width: 150, height: 150 };
  return (
    <div className={styles.ProfilImg}>
      <div
        className={styles.Rounder}
        style={{
          width,
          height,
        }}
      >
        <Image
          src="/img/default_img.svg"
          alt="기본이미지"
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}
