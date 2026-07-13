import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
	title: "Components/Badge",
	component: Badge,
	tags: ["autodocs"],
	args: { children: "New" },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Success: Story = { args: { tone: "success", children: "In stock" } };
export const Warning: Story = { args: { tone: "warning", children: "Low" } };
export const Danger: Story = { args: { tone: "danger", children: "Sold out" } };
export const Accent: Story = { args: { tone: "accent", children: "Popular" } };
