"use client";
import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import instance from "@/app/lib/api/instance";
import Button from "@/app/lib/components/button";
import Avatar from "@/app/_avatar/components/avatar";
import { AvatarImageLabels } from "@/public/avatar/index";
import AvatarSelector from "@/app/_avatar/components/AvatarSelector";
import styles from "./styles/page.module.css";

// export type AvatarT = {
//   skin: keyof typeof AvatarImageLabels.skin;
//   hairType: keyof typeof AvatarImageLabels.hairType;
//   hairColor: keyof typeof AvatarImageLabels.hairColor;
//   clothes: keyof typeof AvatarImageLabels.clothes;
//   accessories: keyof typeof AvatarImageLabels.accessories;
// };
export type AvatarImageLabelsT = {
  skin: Record<AvatarT["skin"], string>;
  hairType: Record<AvatarT["hairType"], string>;
  hairColor: Record<AvatarT["hairColor"], string>;
  clothes: Record<AvatarT["clothes"], string>;
  accessories: Record<AvatarT["accessories"], string>;
};
export type AvatarT = {
  skin: "tone100" | "tone200" | "tone300" | "tone400";
  hairType:
    | "none"
    | "long1"
    | "long2"
    | "long3"
    | "short1"
    | "short2"
    | "short3";
  hairColor: "black" | "blonde" | "brown";
  clothes:
    | "collarBasic"
    | "dressFormal"
    | "hoodie"
    | "jacketLeather"
    | "knitLayered"
    | "knitVest"
    | "tshirtBasic"
    | "tshirtPrinted";
  accessories:
    | "ballcap"
    | "earbuds"
    | "earings"
    | "headset"
    | "nametag"
    | "none";
};
type AvatarProps = {
  avatar: AvatarT;
};

function AvatarProperties({
  avatar: { skin, hairType, hairColor, clothes, accessories },
}: AvatarProps) {
  return (
    <div className={styles.AvatarProperties}>
      <h2 className={styles.AvatarPropertiesTitle}>적용된 속성들</h2>
      <div className={styles.Properties}>
        <div className={styles.PropertyName}>피부 색:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.skin[skin]}
        </div>
        <div className={styles.PropertyName}>머리 종류:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.hairType[hairType]}
        </div>
        <div className={styles.PropertyName}>머리 색:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.hairColor[hairColor]}
        </div>
        <div className={styles.PropertyName}>옷:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.clothes[clothes]}
        </div>
        <div className={styles.PropertyName}>액세서리:</div>
        <div className={styles.PropertyValue}>
          {AvatarImageLabels.accessories[accessories]}
        </div>
      </div>
    </div>
  );
}

function AvatarEditPage() {
  const initialAvatar: AvatarT = {
    skin: "tone100",
    hairType: "none",
    hairColor: "black",
    clothes: "tshirtBasic",
    accessories: "none",
  };
  const [avatar, setAvatar] = useState<AvatarT>(initialAvatar);
  //   const navigate = useNavigate();

  function handleSelectProperty(key: any, value: any) {
    setAvatar({
      ...avatar,
      [key]: value,
    });
  }

  function handleCancelClick() {
    // navigate(-1);
  }

  async function handleSubmit() {
    await instance.patch("/users/me/avatar", avatar);
    // navigate("/me");
  }

  if (!avatar) return null;

  return (
    <>
      <div className={styles.Container}>
        <nav className={styles.Nav}>
          <Button appearance="minimal" onClick={handleCancelClick}>
            취소
          </Button>
          <Button onClick={handleSubmit}>저장하기</Button>
        </nav>
        <div className={styles.Preview}>
          <div className={styles.AvatarContainer}>
            <AvatarProperties avatar={avatar} />
            <Avatar withBorder value={avatar} />
          </div>
        </div>
        <div className={styles.Footer}>
          <AvatarSelector avatar={avatar} onSelect={handleSelectProperty} />
        </div>
      </div>
    </>
  );
}

export default AvatarEditPage;
