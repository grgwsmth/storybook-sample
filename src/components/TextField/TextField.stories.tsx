import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextField } from "./TextField";

const meta = {
	title: "Components/TextField",
	component: TextField,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "A text input field component with label and placeholder support.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: "text",
			description: "The value of the text field",
		},
		placeholder: {
			control: "text",
			description: "Placeholder text to display when the field is empty",
		},
		label: {
			control: "text",
			description: "Label for the text field",
		},
		disabled: {
			control: "boolean",
			description: "Whether the field is disabled",
		},
		onChange: {
			action: "changed",
			description: "Function called when the input value changes",
		},
	},
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Enter text...",
	},
};

export const WithLabel: Story = {
	args: {
		label: "Email Address",
		placeholder: "you@example.com",
	},
};

export const WithValue: Story = {
	args: {
		label: "Name",
		value: "John Doe",
	},
};

export const Disabled: Story = {
	args: {
		label: "Disabled Field",
		value: "Cannot edit this",
		disabled: true,
	},
};

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<TextField
				label="Controlled Input"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Type something..."
			/>
		);
	},
};

export const AllStates: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", minWidth: "300px" }}>
			<TextField label="Default" placeholder="Enter text..." />
			<TextField label="With Value" value="Some text" />
			<TextField label="Disabled" value="Disabled text" disabled />
			<TextField placeholder="No label" />
		</div>
	),
};
