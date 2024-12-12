"use client";
import Button from "./button";
import Link from "./link";
import styles from "./styles/googleButton.module.css";
import Image from "next/image";

function GoogleButton() {
  return (
    <Button
      className={styles.GoogleButton}
      type="button"
      appearance="secondary"
      as={Link}
    >
      <Image src="/img/google.svg" alt="Google" width={20} height={20} />
      구글로 시작하기
    </Button>
  );
}
export default GoogleButton;
