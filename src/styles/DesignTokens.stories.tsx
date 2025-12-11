import type { Meta, StoryObj } from "@storybook/react";
import { colors, spacing, typography, borderRadius, shadows } from "./design-tokens";

const meta = {
	title: "Design System/Design Tokens",
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Design tokens extracted from Figma. These tokens ensure consistency across all components.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
			<div>
				<h3 style={{ marginBottom: "1rem" }}>Primary Colors</h3>
				<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
					<ColorSwatch name="Primary" color={colors.primary} />
					<ColorSwatch name="Secondary" color={colors.secondary} />
					<ColorSwatch name="Success" color={colors.success} />
					<ColorSwatch name="Warning" color={colors.warning} />
					<ColorSwatch name="Error" color={colors.error} />
				</div>
			</div>
			<div>
				<h3 style={{ marginBottom: "1rem" }}>Neutral Colors</h3>
				<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
					{Object.entries(colors.neutral).map(([key, value]) => (
						<ColorSwatch key={key} name={`Neutral ${key}`} color={value} />
					))}
				</div>
			</div>
		</div>
	),
};

export const Spacing: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			{Object.entries(spacing).map(([key, value]) => (
				<div key={key} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
					<div
						style={{
							width: value,
							height: value,
							backgroundColor: colors.primary,
							borderRadius: borderRadius.sm,
						}}
					/>
					<div>
						<strong>{key}:</strong> {value} ({parseFloat(value) * 16}px)
					</div>
				</div>
			))}
		</div>
	),
};

export const Typography: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
			<div>
				<h3 style={{ marginBottom: "1rem" }}>Font Sizes</h3>
				<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
					{Object.entries(typography.fontSize).map(([key, value]) => (
						<div key={key}>
							<div
								style={{
									fontSize: value,
									fontFamily: typography.fontFamily.sans.join(", "),
								}}
							>
								{key}: The quick brown fox jumps over the lazy dog
							</div>
							<small style={{ color: colors.neutral[600] }}>{value}</small>
						</div>
					))}
				</div>
			</div>
			<div>
				<h3 style={{ marginBottom: "1rem" }}>Font Weights</h3>
				<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
					{Object.entries(typography.fontWeight).map(([key, value]) => (
						<div
							key={key}
							style={{
								fontWeight: value,
								fontFamily: typography.fontFamily.sans.join(", "),
							}}
						>
							{key}: The quick brown fox jumps over the lazy dog
						</div>
					))}
				</div>
			</div>
		</div>
	),
};

export const BorderRadius: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			{Object.entries(borderRadius).map(([key, value]) => (
				<div key={key} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
					<div
						style={{
							width: "80px",
							height: "80px",
							backgroundColor: colors.primary,
							borderRadius: value,
						}}
					/>
					<div>
						<strong>{key}:</strong> {value}
					</div>
				</div>
			))}
		</div>
	),
};

export const Shadows: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>
			{Object.entries(shadows).map(([key, value]) => (
				<div key={key} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
					<div
						style={{
							width: "120px",
							height: "120px",
							backgroundColor: "white",
							boxShadow: value,
							borderRadius: borderRadius.md,
						}}
					/>
					<div>
						<strong>{key}:</strong>
						<div
							style={{
								fontFamily: typography.fontFamily.mono.join(", "),
								fontSize: typography.fontSize.sm,
							}}
						>
							{value}
						</div>
					</div>
				</div>
			))}
		</div>
	),
};

// Helper component for color swatches
function ColorSwatch({ name, color }: { name: string; color: string }) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
			<div
				style={{
					width: "100px",
					height: "100px",
					backgroundColor: color,
					borderRadius: borderRadius.md,
					border: `1px solid ${colors.neutral[200]}`,
				}}
			/>
			<div>
				<strong>{name}</strong>
				<div
					style={{
						fontSize: typography.fontSize.sm,
						color: colors.neutral[600],
						fontFamily: typography.fontFamily.mono.join(", "),
					}}
				>
					{color}
				</div>
			</div>
		</div>
	);
}
