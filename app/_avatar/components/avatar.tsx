"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvatarImages } from "@/public/avatar/index";
import styles from "./avatar.module.css";

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
  value?: {
    hairType:
      | "none"
      | "long1"
      | "long2"
      | "long3"
      | "short1"
      | "short2"
      | "short3";
    hairColor: "black" | "blonde" | "brown";
    accessories: "none" | "ballcap" | "earbuds" | "headset" | "nametag";
    skin: "tone100" | "tone200" | "tone300" | "tone400";
    clothes:
      | "collarBasic"
      | "dressFormal"
      | "hoodie"
      | "jacketLeather"
      | "knitLayered"
      | "knitVest"
      | "tshirtBasic"
      | "tshirtPrinted";
  };
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
  // const backgroundImage = `
  //   ${withBorder ? `url("/avatar/avatar-border.svg"),` : ""}
  //   url("/avatar/acc_${value.accessories}.svg"),
  //   url("/avatar/hair_${value.hairType}_${value.hairColor}.svg"),
  //   url("/avatar/"),
  //   url("")
  // `;

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
