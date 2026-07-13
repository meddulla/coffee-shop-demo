import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
	args: { children: "Order now" },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Danger: Story = { args: { variant: "danger", children: "Cancel" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Skip" } };
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const Disabled: Story = { args: { disabled: true } };
