import type { Meta, StoryObj } from '@storybook/react';
import { TokenExample } from './TokenExample';

const meta = {
	title: 'Examples/TokenExample',
	component: TokenExample,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TokenExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};





