/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { AvatarImageLabels, PreviewAvatarImages } from "@/public/avatar/index";
import styles from "./avatarSelector.module.css";

// AvatarProperty 타입
type AvatarProperty =
  | "skin"
  | "hairType"
  | "hairColor"
  | "clothes"
  | "accessories";

// Avatar 타입
type Avatar = Record<AvatarProperty, string>;

// AvatarSelectorProps 타입
type AvatarSelectorProps = {
  avatar: Avatar;
  onSelect: (property: AvatarProperty, value: string) => void;
};

// AvatarImage 타입
type AvatarImage = {
  src: string;
};

// PreviewAvatarImagesType 타입
type PreviewAvatarImagesType = Record<
  AvatarProperty,
  Record<string, AvatarImage>
>;

// 속성 이름 매핑
const AVATAR_SELECTOR_PROPERTY_MAP: Record<AvatarProperty, string> = {
  skin: "피부 톤",
  hairType: "머리 종류",
  hairColor: "머리 색",
  clothes: "옷",
  accessories: "액세서리",
};

// 속성 배열
const PROPERTIES: AvatarProperty[] = Object.keys(
  AVATAR_SELECTOR_PROPERTY_MAP
) as AvatarProperty[];

// 속성 값들
const PROPERTY_VALUES: Record<AvatarProperty, string[]> = {
  skin: Object.keys(PreviewAvatarImages.skin),
  hairType: Object.keys(PreviewAvatarImages.hairType),
  hairColor: Object.keys(PreviewAvatarImages.hairColor),
  clothes: Object.keys(PreviewAvatarImages.clothes),
  accessories: Object.keys(PreviewAvatarImages.accessories),
};

// 이미지 매핑
const PROPERTY_IMAGES: PreviewAvatarImagesType = PreviewAvatarImages;

function AvatarSelector({ avatar, onSelect }: AvatarSelectorProps) {
  const [currentProperty, setCurrentProperty] =
    useState<AvatarProperty>("skin");

  useEffect(() => {
    console.log("Current Property Images:", PROPERTY_IMAGES[currentProperty]);
  }, [currentProperty]);

  return (
    <>
      {/* 속성 메뉴 */}
      <ul className={styles.AvatarMenu}>
        {PROPERTIES.map((property) => (
          <li
            key={property}
            className={`${styles.AvatarMenuItem} ${
              property === currentProperty ? styles.active : ""
            }`}
            onClick={() => setCurrentProperty(property)}
          >
            {AVATAR_SELECTOR_PROPERTY_MAP[property]}
          </li>
        ))}
      </ul>

      {/* 속성 선택기 */}
      <div className={styles.AvatarSelectorContainer}>
        <ul className={styles.AvatarSelector}>
          {PROPERTY_VALUES[currentProperty].map((propertyValue) => (
            <li
              key={propertyValue}
              className={`${styles.AvatarSelectorItem} ${
                avatar[currentProperty] === propertyValue ? styles.active : ""
              }`}
              onClick={() => onSelect(currentProperty, propertyValue)}
            >
              <div
                className={styles.AvatarSelectorPreview}
                style={{
                  backgroundImage: `url(${PROPERTY_IMAGES[currentProperty][propertyValue].src})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className={styles.AvatarSelectorLabel}>
                {
                  AvatarImageLabels[
                    currentProperty as keyof typeof AvatarImageLabels
                  ][
                    propertyValue as keyof (typeof AvatarImageLabels)[keyof typeof AvatarImageLabels]
                  ]
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AvatarSelector;
