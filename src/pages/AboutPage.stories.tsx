import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { AboutPage } from "./AboutPage";

const meta: Meta<typeof AboutPage> = {
	title: "Pages/About",
	component: AboutPage,
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
export const Default: StoryObj<typeof AboutPage> = {};
