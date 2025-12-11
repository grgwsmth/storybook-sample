import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "positiveUp", "negativeUp", "positiveDown", "negativeDown"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { variant: "neutral", children: "This is a neutral alert message." } };
export const PositiveUp: Story = { args: { variant: "positiveUp", children: "Success — positive up alert." } };
export const NegativeUp: Story = { args: { variant: "negativeUp", children: "Error — negative up alert." } };
export const PositiveDown: Story = { args: { variant: "positiveDown", children: "Success — positive down alert." } };
export const NegativeDown: Story = { args: { variant: "negativeDown", children: "Error — negative down alert." } };
