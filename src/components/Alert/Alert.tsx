import React from "react";
import styles from "./Alert.module.css";
import neutralSrc from "./assets/alert-neutral.svg";
import positiveUpSrc from "./assets/alert-positiveUp.svg";
import negativeUpSrc from "./assets/alert-negativeUp.svg";
import positiveDownSrc from "./assets/alert-positiveDown.svg";
import negativeDownSrc from "./assets/alert-negativeDown.svg";

export type AlertVariant =
  | "neutral"
  | "positiveUp"
  | "negativeUp"
  | "positiveDown"
  | "negativeDown";

export interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  role?: string;
}

const ICON_MAP: Record<AlertVariant, string> = {
  neutral: neutralSrc,
  positiveUp: positiveUpSrc,
  negativeUp: negativeUpSrc,
  positiveDown: positiveDownSrc,
  negativeDown: negativeDownSrc,
};

export const Alert: React.FC<AlertProps> = ({
  variant = "neutral",
  children,
  role,
}) => {
  const src = ICON_MAP[variant];
  const ariaLive = variant === "neutral" ? "polite" : "assertive";

  return (
    <div className={`${styles.alert} ${styles[variant] || ""}`} role={role || "status"} aria-live={ariaLive}>
      <img src={src} className={styles.icon} alt="" aria-hidden />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Alert;
