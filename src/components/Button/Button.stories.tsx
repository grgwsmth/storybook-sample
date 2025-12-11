import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A versatile button component with multiple variants and sizes. Built with design tokens for consistent styling.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "outline", "ghost"],
			description: "The visual style variant of the button",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "The size of the button",
		},
		disabled: {
			control: "boolean",
			description: "Whether the button is disabled",
		},
		onClick: {
			action: "clicked",
			description: "Callback function when button is clicked",
		},
		children: {
			control: "text",
			description: "The content inside the button",
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Button",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Button",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Button",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		children: "Small Button",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		children: "Medium Button",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Large Button",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Disabled Button",
	},
};

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
		</div>
	),
};

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};
