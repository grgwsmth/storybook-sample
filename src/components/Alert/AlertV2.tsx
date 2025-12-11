import React from "react";
import styles from "./Alert.module.css";
import { PositiveUpIcon } from "./icons/PositiveUpIcon";
import { NegativeUpIcon } from "./icons/NegativeUpIcon";
import { PositiveDownIcon } from "./icons/PositiveDownIcon";
import { NegativeDownIcon } from "./icons/NegativeDownIcon";
import NeutralIcon from "./icons/NeutralIcon";
import { getColorToken } from "../../styles/tokens";

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

const ICON_COMP: Record<AlertVariant, React.FC<{ size?: number; color?: string }>> = {
  neutral: NeutralIcon,
  positiveUp: PositiveUpIcon,
  negativeUp: NegativeUpIcon,
  positiveDown: PositiveDownIcon,
  negativeDown: NegativeDownIcon,
};

export const Alert: React.FC<AlertProps> = ({
  variant = "neutral",
  children,
  role,
}) => {
  const Icon = ICON_COMP[variant];
  const ariaLive = variant === "neutral" ? "polite" : "assertive";

  const isPositive = variant.startsWith("positive");
  const isNegative = variant.startsWith("negative");

  const pickColor = (paths: string[]) => {
    for (const p of paths) {
      try {
        const v = getColorToken(p);
        if (v) return v;
      } catch (e) {
        // ignore
      }
    }
    return undefined;
  };

  const backgroundColor =
    pickColor(["ld.semantic.color.background.subtle", "ld.primitive.color.gray.10", "ld.primitive.color.white"]) || "#F6F6F7";

  const iconColor = isPositive
    ? pickColor([
        "ld.semantic.color.border.positive",
        "ld.primitive.color.green.110",
        "ld.primitive.color.green.100",
        "ld.primitive.color.green.10",
      ]) || "#10B981"
    : isNegative
    ? pickColor([
        "ld.semantic.color.border.negative",
        "ld.primitive.color.red.110",
        "ld.primitive.color.red.100",
        "ld.primitive.color.red.10",
      ]) || "#EF4444"
    : pickColor(["ld.semantic.color.border.brand", "ld.primitive.color.gray.700"]) || "#374151";

  const textColor = pickColor([
    "ld.semantic.color.text.primary",
    "ld.primitive.color.gray.900",
    "ld.primitive.color.gray.800",
  ]) || "#111";
  const borderColor = pickColor(["ld.semantic.color.border.subtle", "ld.primitive.color.gray.100"]) || "transparent";

  return (
    <div
      className={styles.alert}
      role={role || "status"}
      aria-live={ariaLive}
      style={{ backgroundColor, color: textColor, borderColor }}
    >
      <span className={styles.icon} aria-hidden>
        <Icon size={28} color={iconColor} />
      </span>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Alert;
