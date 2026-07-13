import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const MenuItem: Story = {
	render: () => (
		<div style={{ maxWidth: 300 }}>
			<Card
				title="Cortado"
				subtitle="Espresso with warm milk"
				footer={
					<>
						<strong>$4.50</strong>
						<Button size="sm">Add</Button>
					</>
				}
			>
				<Badge tone="accent">Popular</Badge>
			</Card>
		</div>
	),
};
