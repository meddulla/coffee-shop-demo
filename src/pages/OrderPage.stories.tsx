import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { OrderPage } from "./OrderPage";

const meta: Meta<typeof OrderPage> = {
	title: "Pages/Order",
	component: OrderPage,
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={["/order?item=cortado"]}>
				<Story />
			</MemoryRouter>
		),
	],
	parameters: { layout: "fullscreen" },
};
export default meta;
export const Default: StoryObj<typeof OrderPage> = {};
