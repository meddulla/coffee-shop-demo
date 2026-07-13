import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
	title: "Components/Alert",
	component: Alert,
	tags: ["autodocs"],
	args: { children: "Order placed successfully.", title: "Success" },
};
export default meta;
type Story = StoryObj<typeof Alert>;
export const Info: Story = { args: { tone: "info", title: "Heads up" } };
export const Success: Story = { args: { tone: "success" } };
export const Danger: Story = {
	args: { tone: "danger", title: "Error", children: "Payment declined." },
};
