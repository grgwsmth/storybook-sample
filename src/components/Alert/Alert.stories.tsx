import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta = {
	title: "Components/Alert",
	component: Alert,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["info", "error", "warning", "success"],
			description: "The variant of the alert",
		},
		children: {
			control: "text",
			description: "The content to display in the alert",
		},
		role: {
			control: "text",
			description: "ARIA role for the alert",
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
	args: {
		variant: "info",
		children: "This is an informational alert message.",
	},
};

export const Success: Story = {
	args: {
		variant: "success",
		children: "Success! Your action was completed successfully.",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		children: "Warning: Please review this information carefully.",
	},
};

export const Error: Story = {
	args: {
		variant: "error",
		children: "Error: Something went wrong. Please try again.",
	},
};

export const LongMessage: Story = {
	args: {
		variant: "info",
		children:
			"This is a longer alert message that demonstrates how the component handles multiple lines of text. The alert will wrap naturally and maintain proper spacing and alignment.",
	},
};
