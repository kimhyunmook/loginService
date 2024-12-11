"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
// import checkImage from "../assets/check.svg";
import useIsMounted from "../hooks/useIsMounted";
import styles from "./toasterProvider.module.css";
import { Normal } from "../types/types";

const ICONS = {
  info: "/img/check.svg",
  warn: null,
};

function Toast({
  type,
  message,
  onClick,
}: {
  type: keyof typeof ICONS;
  message: string;
  onClick: any;
}) {
  const isMounted = useIsMounted(100);
  const icon = ICONS[type];
  const className = `${styles.Toast} ${styles[type]} ${
    isMounted ? styles.mounted : ""
  }`;

  return (
    <div className={className} onClick={onClick}>
      {icon && <img className={styles.Icon} src={icon} alt={type} />}
      {message}
    </div>
  );
}

const ToasterContext = createContext<any>({});
type ToastType = keyof typeof ICONS; // "info" | "warn"

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}
function ToasterProvider({ children }: Normal) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(type: string, message: string) {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };

    setToasts((prevToasts: any) => [...prevToasts, newToast]);
    return newToast;
  }

  function removeToast(id: number) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  function toaster(type: string, message: string) {
    const newToast = addToast(type, message);
    setTimeout(() => removeToast(newToast.id), 2000);
  }

  return (
    <ToasterContext.Provider value={{ toaster }}>
      {children}
      <div className={styles.ToastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  const { toaster } = useContext(ToasterContext);
  if (!toaster) {
    throw new Error("ToastContext 안에서만 사용할 수 있습니다.");
  }
  return toaster;
}

export default ToasterProvider;
