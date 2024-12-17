/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Card from "@/app/lib/components/layout/Card";
import Button from "@/app/lib/components/button";
import styles from "./styles/page.module.css";
// import Avatar from "../_avatar/components/avatar";
import { useToaster } from "@/app/lib/contexts/toasterProvider";
// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import instance from "@/app/lib/api/instance";
// import Link from "next/link";
import { useAuth } from "@/app/lib/contexts/authProvider";
import Image from "next/image";
import ProfilImg from "../lib/components/profilImg";

function MyPage() {
  const { user, isLoading } = useAuth();
  // const [avatar, setAvatar] = useState<any>();
  const router = useRouter();
  const toast = useToaster();

  // async function getMyAvatar() {
  //   let avatar = {};
  //   try {
  //     const res = await instance.get("/users/me/avatar");
  //     avatar = res.data;
  //     console.log(avatar);
  //     setAvatar(avatar);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  function handleEditClick() {
    router.push("/me/edit");
  }

  // function handleDownloadClick() {
  //   // downloadAvatar(avatar, user.name);
  // }

  function handleShareClick() {
    const url = `${window.location.origin}/${user?.id}`;
    navigator.clipboard.writeText(url);
    toast("info", "공유 링크를 복사했어요.");
  }
  // useEffect(() => {
  //   getMyAvatar();
  //   // console.log("avatar", avatar);
  // }, []);

  if (!isLoading && !!!user) {
    alert("로그인이 필요합니다.");
    router.push("/");
    return null;
  }
  if (!isLoading && user)
    return (
      <>
        {/* <header className={styles.Header}>내 아바타</header>
        <div className={styles.AvatarContainer}>
          <Link className={styles.AvatarEditLink} href="/me/avatar">
            <Image src={"/img/setting.svg"} alt="설정" width={24} height={24} />
          </Link>
          <Avatar className={styles.Avatar} value={avatar} />
        </div> */}
        {/* <Button className={styles.Button} onClick={handleDownloadClick}>
          <Image src={"/img/download.svg"} alt="설정" width={24} height={24} />
          다운받기
        </Button> */}
        <ProfilImg />
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
        <Button
          className={styles.Button}
          appearance="secondary"
          onClick={handleShareClick}
        >
          <Image src={"/img/share.svg"} alt="설정" width={24} height={25} />
          공유하기
        </Button>
      </>
    );
}

export default MyPage;
