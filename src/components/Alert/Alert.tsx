import React from "react";
import { getColor, getTypography, typographyToCSS, getToken } from "../../styles/tokens";
import placeholderIcon from "../../assets/icons/placeholder.svg";

export type AlertVariant = "info" | "error" | "warning" | "success";

export interface AlertProps {
	/**
	 * The variant of the alert
	 * @default 'info'
	 */
	variant?: AlertVariant;
	/**
	 * The content to display in the alert
	 */
	children: React.ReactNode;
	/**
	 * ARIA role for the alert
	 * @default 'status'
	 */
	role?: string;
}

/**
 * Alert component based on [LD 3.5] Alert from Figma
 *
 * Alerts surface information within a flow that is important to the user's journey.
 * They are system-created and non-dismissible. Use an Alert to relay errors,
 * reinforce success, warn about a potential issue, or communicate details.
 */
export const Alert: React.FC<AlertProps> = ({ variant = "info", children, role = "status" }) => {
	// Get design tokens for colors based on variant
	const getBorderColor = (): string => {
		switch (variant) {
			case "info":
				return getColor("ld.semantic.color.border.info") || "#0053e2";
			case "success":
				return getColor("ld.semantic.color.border.positive") || "#10b981";
			case "error":
				return getColor("ld.semantic.color.border.negative") || "#ef4444";
			case "warning":
				return getColor("ld.semantic.color.border.warning") || "#f59e0b";
			default:
				return getColor("ld.semantic.color.border.info") || "#0053e2";
		}
	};

	const getBackgroundColor = (): string => {
		switch (variant) {
			case "info":
				return getColor("ld.primitive.color.blue.5") || "#f0f5ff";
			case "success":
				return getColor("ld.primitive.color.green.5") || "#f0fdf4";
			case "error":
				return getColor("ld.primitive.color.red.5") || "#fef2f2";
			case "warning":
				return getColor("ld.primitive.color.spark.5") || "#fffbeb";
			default:
				return getColor("ld.primitive.color.blue.5") || "#f0f5ff";
		}
	};

	const getTextColor = (): string => {
		// Use variant-specific text colors from Figma specs
		switch (variant) {
			case "info":
				return (
					getColor("ld.semantic.color.text.info.onFill.subtle") ||
					getColor("ld.primitive.color.blue.130") ||
					"#002e99"
				);
			case "success":
				return (
					getColor("ld.semantic.color.text.positive.onFill.subtle") ||
					getColor("ld.primitive.color.green.130") ||
					"#1d5f02"
				);
			case "error":
				return (
					getColor("ld.semantic.color.text.negative.onFill.subtle") ||
					getColor("ld.primitive.color.red.130") ||
					"#a20c00"
				);
			case "warning":
				return (
					getColor("ld.semantic.color.text.warning.onFill.subtle") ||
					getColor("ld.primitive.color.spark.160") ||
					"#662b0d"
				);
			default:
				return (
					getColor("ld.semantic.color.text.info.onFill.subtle") ||
					getColor("ld.primitive.color.blue.130") ||
					"#002e99"
				);
		}
	};

	// Get typography token for body text (14px, 400 weight, 20px line height)
	// Based on Figma specs: Everyday Sans UI, 14px, 400 weight, 20px line height
	// Using the design token: ld.semantic.textStyle.body.small.default
	const textStyle = getTypography("ld.semantic.textStyle.body.small.default");

	// Get font family from token - try multiple token paths
	const fontFamilyToken =
		getToken("ld.primitive.font.family.sans") ||
		getToken("ld.semantic.font.body.small.family") ||
		"Everyday Sans UI";

	const textCSS = textStyle
		? {
				...typographyToCSS(textStyle),
				fontFamily: `${fontFamilyToken}, system-ui, sans-serif`,
				fontSize: "14px", // Override with exact Figma value
				lineHeight: "20px", // Override with exact Figma value
		  }
		: {
				fontFamily: `${fontFamilyToken}, system-ui, sans-serif`,
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "20px",
		  };

	// Determine aria-live based on variant
	const ariaLive = variant === "info" ? "polite" : "assertive";

	const borderColor = getBorderColor();
	const backgroundColor = getBackgroundColor();
	const textColor = getTextColor();

	const containerStyle: React.CSSProperties = {
		display: "flex",
		alignItems: "center", // Vertically center icon and content
		gap: "8px", // itemSpacing from Figma
		padding: "8px 12px", // paddingTop/Bottom: 8px, paddingLeft/Right: 12px from Figma
		borderRadius: "4px", // cornerRadius from Figma
		border: `1px solid ${borderColor}`,
		borderLeft: "none", // Left border is handled by the Tab element
		backgroundColor,
		color: textColor,
		position: "relative", // For positioning the left border accent
		...textCSS,
	};

	// Left border accent (Tab element from Figma) - 4px wide with rounded left corners
	const leftBorderStyle: React.CSSProperties = {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		width: "4px",
		backgroundColor: borderColor,
		borderTopLeftRadius: "4px",
		borderBottomLeftRadius: "4px",
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	};

	const iconStyle: React.CSSProperties = {
		width: "16px", // Icon size from Figma
		height: "16px",
		flexShrink: 0,
		color: borderColor, // Icon uses border color
	};

	const contentStyle: React.CSSProperties = {
		flex: "1 1 auto",
	};

	return (
		<div style={containerStyle} role={role} aria-live={ariaLive} aria-atomic="true">
			<div style={leftBorderStyle} aria-hidden="true" />
			<img src={placeholderIcon} alt="" aria-hidden="true" style={iconStyle} />
			<div style={contentStyle}>{children}</div>
		</div>
	);
};

export default Alert;
