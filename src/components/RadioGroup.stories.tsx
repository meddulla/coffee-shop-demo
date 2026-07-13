import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
	title: "Components/RadioGroup",
	component: RadioGroup,
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Sizes: Story = {
	render: () => {
		const [value, setValue] = useState("medium");
		return (
			<div style={{ maxWidth: 320 }}>
				<RadioGroup
					name="size"
					value={value}
					onChange={setValue}
					options={[
						{ value: "small", label: "Small", description: "8oz" },
						{ value: "medium", label: "Medium", description: "12oz" },
						{ value: "large", label: "Large", description: "16oz" },
					]}
				/>
			</div>
		);
	},
};
