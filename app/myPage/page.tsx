"use client";
import Card from "../components/Card";
import Button from "../components/button";
import styles from "./page.module.css";
import Avatar from "../_avatar/components/avatar";
import { useToaster } from "../contexts/toasterProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import instance from "../api/instance";
import Link from "next/link";
import { useAuth } from "../contexts/authProvider";
import Image from "next/image";

function MyPage() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState({});
  const router = useRouter();
  const toast = useToaster();
  useEffect(() => {
    getMyAvatar();
  }, [avatar]);

  async function getMyAvatar() {
    const res = await instance.get("/users/me/avatar");
    const avatar = res.data;
    setAvatar(avatar);
  }
  function handleEditClick() {
    router.push("/me/edit");
  }

  function handleDownloadClick() {
    // downloadAvatar(avatar, user.name);
  }

  function handleShareClick() {
    const url = `${window.location.origin}/${user?.id}`;
    navigator.clipboard.writeText(url);
    toast("info", "공유 링크를 복사했어요.");
  }
  if (!!!user) {
    alert("로그인이 필요합니다.");
    router.push("/");
    return null;
  }
  return (
    <>
      <header className={styles.Header}>내 아바타</header>
      <div className={styles.AvatarContainer}>
        <Link className={styles.AvatarEditLink} href="/me/avatar/edit">
          <Image src={"/img/setting.svg"} alt="설정" width={24} height={24} />
        </Link>
        <Avatar className={styles.Avatar} value={avatar} />
      </div>
      <Button className={styles.Button} onClick={handleDownloadClick}>
        <Image src={"/img/download.svg"} alt="설정" width={24} height={24} />
        다운받기
      </Button>
      <Button
        className={styles.Button}
        appearance="secondary"
        onClick={handleShareClick}
      >
        <Image src={"/img/share.svg"} alt="설정" width={24} height={25} />
        공유하기
      </Button>
      <Card className={styles.Profile} onClick={handleEditClick}>
        <div className={styles.Label}>이름</div>
        <div className={styles.Name}>{user.name}</div>
        <div className={styles.Label}>이메일</div>
        <div className={styles.Email}>{user.email}</div>
        <Image
          src={"/img/edit.svg"}
          alt="설정"
          width={24}
          height={24}
          className={styles.Edit}
        />
      </Card>
    </>
  );
}

export default MyPage;
