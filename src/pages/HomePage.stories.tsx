import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { HomePage } from "./HomePage";

const meta: Meta<typeof HomePage> = {
	title: "Pages/Home",
	component: HomePage,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
	parameters: { layout: "fullscreen" },
};
export default meta;
export const Default: StoryObj<typeof HomePage> = {};
