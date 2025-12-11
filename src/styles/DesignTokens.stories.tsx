import type { Meta, StoryObj } from "@storybook/react";
import { ldTokens, getColor, getTypography, typographyToCSS, shadowToCSS, tokens } from "./tokens";

const meta = {
	title: "Design System/Design Tokens",
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Design tokens from JSON files. These tokens ensure consistency across all components.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to recursively get all color values from an object
function getAllColors(obj: any, path: string[] = []): Array<{ path: string; value: string }> {
	const colors: Array<{ path: string; value: string }> = [];

	if (!obj || typeof obj !== "object") return colors;

	for (const [key, value] of Object.entries(obj)) {
		const currentPath = [...path, key];

		if (value && typeof value === "object") {
			// Check if it's a token object with $value
			if ("$value" in value && typeof value.$value === "string") {
				const colorValue = getColor(currentPath.join("."));
				if (colorValue) {
					colors.push({ path: currentPath.join("."), value: colorValue });
				}
			} else {
				// Recursively search nested objects
				colors.push(...getAllColors(value, currentPath));
			}
		} else if (typeof value === "string" && (value.startsWith("#") || value.startsWith("rgb"))) {
			colors.push({ path: currentPath.join("."), value });
		}
	}

	return colors;
}

// Helper to group colors by family (blue, green, red, etc.)
function groupColorsByFamily(colors: Array<{ path: string; value: string }>) {
	const groups: Record<string, Array<{ path: string; value: string }>> = {};

	for (const color of colors) {
		const parts = color.path.split(".");
		// Find the color family (blue, green, red, etc.)
		const colorFamilyIndex = parts.findIndex(
			(part) =>
				["blue", "green", "red", "yellow", "orange", "purple", "pink", "cyan", "gray", "neutral"].includes(
					part.toLowerCase()
				) || part === "black" || part === "white"
		);

		if (colorFamilyIndex !== -1) {
			const family = parts[colorFamilyIndex];
			if (!groups[family]) {
				groups[family] = [];
			}
			groups[family].push(color);
		} else {
			// Group others as "other"
			if (!groups.other) {
				groups.other = [];
			}
			groups.other.push(color);
		}
	}

	return groups;
}

export const PrimitiveColors: Story = {
	render: () => {
		const primitiveColors = ldTokens.colors || {};
		const allColors = getAllColors(primitiveColors);
		const colorGroups = groupColorsByFamily(allColors);

		// Sort color groups
		const sortedGroups = Object.entries(colorGroups).sort(([a], [b]) => {
			const order = ["black", "white", "blue", "green", "red", "yellow", "orange", "purple", "pink", "cyan", "gray", "neutral", "transparentDark", "transparentLight", "other"];
			const aIndex = order.indexOf(a);
			const bIndex = order.indexOf(b);
			if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;
			return aIndex - bIndex;
		});

		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
				{sortedGroups.map(([family, colors]) => (
					<div key={family}>
						<h3 style={{ marginBottom: "1.5rem", textTransform: "capitalize" }}>{family} Colors</h3>
						<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
							{colors
								.sort((a, b) => {
									// Try to sort by number if present
									const aNum = parseInt(a.path.match(/\d+/)?.[0] || "0");
									const bNum = parseInt(b.path.match(/\d+/)?.[0] || "0");
									return aNum - bNum;
								})
								.map((color) => (
									<ColorSwatch key={color.path} name={color.path.split(".").pop() || ""} color={color.value} path={color.path} />
								))}
						</div>
					</div>
				))}
			</div>
		);
	},
};

export const SemanticColors: Story = {
	render: () => {
		const semanticColors = ldTokens.semanticColors || {};
		const allColors = getAllColors(semanticColors);

		if (allColors.length === 0) {
			return <div>No semantic colors found in tokens.</div>;
		}

		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
				<div>
					<h3 style={{ marginBottom: "1rem" }}>Semantic Colors</h3>
					<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
						{allColors.map((color) => (
							<ColorSwatch
								key={color.path}
								name={color.path.split(".").slice(-2).join(" ")}
								color={color.value}
								path={color.path}
							/>
						))}
					</div>
				</div>
			</div>
		);
	},
};

export const ChartColors: Story = {
	render: () => {
		const chartColors = ldTokens.semanticColors?.chart?.categorical || {};

		if (!chartColors || Object.keys(chartColors).length === 0) {
			return <div>No chart colors found in tokens.</div>;
		}

		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
				<div>
					<h3 style={{ marginBottom: "1rem" }}>Chart Categorical Colors</h3>
					<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
						{Object.entries(chartColors).map(([key, value]: [string, any]) => {
							const colorValue = getColor(`ld.semantic.color.chart.categorical.${key}`);
							if (colorValue) {
								return <ColorSwatch key={key} name={`Categorical ${key}`} color={colorValue} path={`chart.categorical.${key}`} />;
							}
							return null;
						})}
					</div>
				</div>
			</div>
		);
	},
};

export const Typography: Story = {
	render: () => {
		const textStyles = ldTokens.textStyles || {};

		const renderTypographyGroup = (groupName: string, group: any, level = 0) => {
			if (!group || typeof group !== "object") return null;

			const entries = Object.entries(group);

			return (
				<div key={groupName} style={{ marginLeft: `${level * 1.5}rem`, marginBottom: "2rem" }}>
					<h4 style={{ marginBottom: "1rem", textTransform: "capitalize" }}>{groupName}</h4>
					{entries.map(([key, value]: [string, any]) => {
						if (value && typeof value === "object") {
							if (value.$value || (value.fontFamily || value.fontSize)) {
								// It's a typography token
								const typoToken = getTypography(`ld.semantic.textStyle.${groupName}.${key}`);
								if (typoToken) {
									const css = typographyToCSS(typoToken);
									return (
										<div key={key} style={{ marginBottom: "1.5rem" }}>
											<div style={{ ...css, marginBottom: "0.5rem" }}>
												{key}: The quick brown fox jumps over the lazy dog
											</div>
											<small style={{ color: "#666", fontFamily: "monospace" }}>
												{JSON.stringify(css, null, 2)}
											</small>
										</div>
									);
								}
							} else {
								// It's a nested group
								return renderTypographyGroup(`${groupName}.${key}`, value, level + 1);
							}
						}
						return null;
					})}
				</div>
			);
		};

		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
				{Object.entries(textStyles).map(([groupName, group]) => renderTypographyGroup(groupName, group))}
			</div>
		);
	},
};

export const Elevation: Story = {
	render: () => {
		const elevation = ldTokens.elevation || {};

		if (!elevation || Object.keys(elevation).length === 0) {
			return <div>No elevation tokens found.</div>;
		}

		return (
			<div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", backgroundColor: "#f5f5f5" }}>
				{Object.entries(elevation).map(([key, value]: [string, any]) => {
					const shadowCSS = shadowToCSS(value);
					return (
						<div key={key} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
							<div
								style={{
									width: "120px",
									height: "120px",
									backgroundColor: "white",
									boxShadow: shadowCSS,
									borderRadius: "8px",
								}}
							/>
							<div>
								<strong>Elevation {key}</strong>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: "0.875rem",
										marginTop: "0.5rem",
										color: "#666",
									}}
								>
									{shadowCSS || JSON.stringify(value, null, 2)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	},
};

export const TokenExplorer: Story = {
	render: () => {
		return (
			<div style={{ padding: "2rem" }}>
				<h3 style={{ marginBottom: "1rem" }}>Token Structure</h3>
				<p style={{ marginBottom: "1.5rem", color: "#666" }}>
					Explore the full token structure. Use the helper functions to access tokens in your components.
				</p>
				<pre
					style={{
						backgroundColor: "#f5f5f5",
						padding: "1.5rem",
						borderRadius: "8px",
						overflow: "auto",
						fontSize: "0.875rem",
						maxHeight: "600px",
					}}
				>
					{JSON.stringify(tokens, null, 2).substring(0, 5000)}
					{JSON.stringify(tokens, null, 2).length > 5000 && "\n... (truncated)"}
				</pre>
			</div>
		);
	},
};

// Helper component for color swatches
function ColorSwatch({ name, color, path }: { name: string; color: string; path?: string }) {
	const isLight = (() => {
		if (color.startsWith("#")) {
			const hex = color.replace("#", "");
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);
			const brightness = (r * 299 + g * 587 + b * 114) / 1000;
			return brightness > 128;
		}
		return false;
	})();

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
			<div
				style={{
					width: "100px",
					height: "100px",
					backgroundColor: color,
					borderRadius: "8px",
					border: `1px solid ${color === "#ffffff" ? "#e5e5e5" : "transparent"}`,
					boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
				}}
			/>
			<div>
				<strong style={{ display: "block", marginBottom: "0.25rem" }}>{name}</strong>
				<div
					style={{
						fontSize: "0.75rem",
						color: "#666",
						fontFamily: "monospace",
						marginBottom: "0.25rem",
					}}
				>
					{color}
				</div>
				{path && (
					<div
						style={{
							fontSize: "0.7rem",
							color: "#999",
							fontFamily: "monospace",
							wordBreak: "break-all",
						}}
					>
						{path}
					</div>
				)}
			</div>
		</div>
	);
}
