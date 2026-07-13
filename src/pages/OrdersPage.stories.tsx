import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { OrdersPage } from "./OrdersPage";

const meta: Meta<typeof OrdersPage> = {
	title: "Pages/Orders",
	component: OrdersPage,
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
export const Default: StoryObj<typeof OrdersPage> = {};
