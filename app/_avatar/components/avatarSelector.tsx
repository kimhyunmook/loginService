/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { AvatarImageLabels, PreviewAvatarImages } from "@/public/avatar/index";
import styles from "./avatarSelector.module.css";

// 타입 정의
type AvatarProperty =
  | "skin"
  | "hairType"
  | "hairColor"
  | "clothes"
  | "accessories";

type Avatar = {
  skin: string;
  hairType: string;
  hairColor: string;
  clothes: string;
  accessories: string;
};

type AvatarSelectorProps = {
  avatar: Avatar;
  onSelect: (property: AvatarProperty, value: string) => void;
};

const AVATAR_SELECTOR_PROPERTY_MAP: Record<AvatarProperty, string> = {
  skin: "피부 톤",
  hairType: "머리 종류",
  hairColor: "머리 색",
  clothes: "옷",
  accessories: "액세서리",
};

const PROPERTIES: AvatarProperty[] = Object.keys(
  AVATAR_SELECTOR_PROPERTY_MAP
) as AvatarProperty[];

const PROPERTY_VALUES: Record<AvatarProperty, string[]> = {
  skin: Object.keys(PreviewAvatarImages.skin),
  hairType: Object.keys(PreviewAvatarImages.hairType),
  hairColor: Object.keys(PreviewAvatarImages.hairColor),
  clothes: Object.keys(PreviewAvatarImages.clothes),
  accessories: Object.keys(PreviewAvatarImages.accessories),
};

const PROPERTY_IMAGES: Record<AvatarProperty, Record<string, string>> = {
  skin: PreviewAvatarImages.skin,
  hairType: PreviewAvatarImages.hairType,
  hairColor: PreviewAvatarImages.hairColor,
  clothes: PreviewAvatarImages.clothes,
  accessories: PreviewAvatarImages.accessories,
};

function AvatarSelector({ avatar, onSelect }: AvatarSelectorProps) {
  const [currentProperty, setCurrentProperty] =
    useState<AvatarProperty>("skin");
  console.log("ppp", PROPERTY_IMAGES);
  return (
    <>
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
      <div className={styles.AvatarSelectorContainer}>
        <ul className={styles.AvatarSelector}>
          {PROPERTY_VALUES[currentProperty].map((propertyValue) => {
            console.log(avatar);

            return (
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
                    backgroundImage: `url(${PROPERTY_IMAGES[currentProperty][propertyValue]})`,
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
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default AvatarSelector;
