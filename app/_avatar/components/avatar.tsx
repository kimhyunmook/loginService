"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvatarImages } from "@/public/avatar/index";
import styles from "./avatar.module.css";
import { AvatarT } from "@/app/me/avatar/page";

function Avatar({
  className = "",
  value = {
    hairType: "none",
    hairColor: "black",
    accessories: "none",
    skin: "tone100",
    clothes: "tshirtBasic",
  },
  withBorder = false,
}: {
  className?: string;
  value?: AvatarT;
  withBorder?: boolean;
}) {
  if (Object.keys(value).length < 5)
    value = {
      hairType: "none",
      hairColor: "black",
      accessories: "none",
      skin: "tone100",
      clothes: "tshirtBasic",
    };
  const backgroundImage = `
      ${withBorder ? `url("/avatar/avatar-border.svg"),` : ""}
      url("${AvatarImages.accessories[value.accessories].src}"),
      url("${AvatarImages.hair[value.hairType][value.hairColor].src}"),
      url("${AvatarImages.clothes[value.clothes].src}"),
      url("${AvatarImages.skin[value.skin].src}")
    `;

  const backgroundSize = `
    ${withBorder ? `100%,` : ""}
    100%,
    100%,
    100%,
    100%
  `;

  const backgroundPosition = `
  ${withBorder ? `center center,` : ""}
    center center,
    center center,
    center center,
    center center
  `;

  return (
    <div
      className={className || styles.Avatar}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundImage,
        backgroundSize,
        backgroundPosition,
      }}
    ></div>
  );
}

export default Avatar;
