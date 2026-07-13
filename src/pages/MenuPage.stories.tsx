import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { MenuPage } from "./MenuPage";

const meta: Meta<typeof MenuPage> = {
	title: "Pages/Menu",
	component: MenuPage,
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

export const Default: StoryObj<typeof MenuPage> = {};
