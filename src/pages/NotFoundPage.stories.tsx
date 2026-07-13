import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { NotFoundPage } from "./NotFoundPage";

const meta: Meta<typeof NotFoundPage> = {
	title: "Pages/NotFound",
	component: NotFoundPage,
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
export const Default: StoryObj<typeof NotFoundPage> = {};
