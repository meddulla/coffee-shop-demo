import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { FeedbackPage } from "./FeedbackPage";

const meta: Meta<typeof FeedbackPage> = {
	title: "Pages/Feedback",
	component: FeedbackPage,
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
export const Default: StoryObj<typeof FeedbackPage> = {};
