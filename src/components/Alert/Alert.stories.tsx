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
		wrapAlert: {
			control: "boolean",
			description: "Whether the alert text should wrap to multiple lines",
		},
		action: {
			control: "text",
			description: "Action button text",
		},
		onActionClick: {
			action: "clicked",
			description: "Callback when the action button is clicked",
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

export const WithAction: Story = {
	args: {
		variant: "info",
		children: "This alert has an action button.",
		action: "Action button",
		onActionClick: () => alert("Action clicked!"),
	},
};

export const WrappedWithAction: Story = {
	args: {
		variant: "info",
		wrapAlert: true,
		children:
			"This is a longer alert message that wraps to multiple lines when wrapAlert is true.",
		action: "Action button",
		onActionClick: () => alert("Action clicked!"),
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
			<Alert variant="info" wrapAlert={false} action="View details">
				Info alert without wrapping
			</Alert>
			<Alert variant="info" wrapAlert={true} action="View details">
				Info alert with wrapping enabled
			</Alert>
			<Alert variant="success" wrapAlert={false} action="Dismiss">
				Success alert without wrapping
			</Alert>
			<Alert variant="success" wrapAlert={true} action="Dismiss">
				Success alert with wrapping enabled
			</Alert>
			<Alert variant="warning" wrapAlert={false} action="Learn more">
				Warning alert without wrapping
			</Alert>
			<Alert variant="warning" wrapAlert={true} action="Learn more">
				Warning alert with wrapping enabled
			</Alert>
			<Alert variant="error" wrapAlert={false} action="Try again">
				Error alert without wrapping
			</Alert>
			<Alert variant="error" wrapAlert={true} action="Try again">
				Error alert with wrapping enabled
			</Alert>
		</div>
	),
};


