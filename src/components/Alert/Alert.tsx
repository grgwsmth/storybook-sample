import React from "react";
import styles from "./Alert.module.css";
import neutralSrc from "./assets/alert-neutral.svg";
import positiveUpSrc from "./assets/alert-positiveUp.svg";
import negativeUpSrc from "./assets/alert-negativeUp.svg";
import positiveDownSrc from "./assets/alert-positiveDown.svg";
import negativeDownSrc from "./assets/alert-negativeDown.svg";
import { colors as legacyColors } from "../../styles/design-tokens";

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

  // Map variants to token-driven colors (use legacy token exports as canonical source)
  const isPositive = variant.startsWith("positive");
  const isNegative = variant.startsWith("negative");

  const backgroundColor =
    variant === "neutral" ? legacyColors.neutral[100] : legacyColors.neutral[50];

  const iconColor = isPositive ? legacyColors.success : isNegative ? legacyColors.error : legacyColors.neutral[700];
  const textColor = legacyColors.neutral[900] || legacyColors.neutral[800] || "#111";
  const borderColor = "transparent";

  return (
    <div
      className={styles.alert}
      role={role || "status"}
      aria-live={ariaLive}
      style={{ backgroundColor, color: textColor, borderColor }}
    >
      <img src={src} className={styles.icon} alt="" aria-hidden style={{ color: iconColor }} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Alert;
