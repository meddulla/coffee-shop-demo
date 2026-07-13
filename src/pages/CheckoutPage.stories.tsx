import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { saveOrder } from "../lib/storage";

import { CheckoutPage } from "./CheckoutPage";

const meta: Meta<typeof CheckoutPage> = {
	title: "Pages/Checkout",
	component: CheckoutPage,
	decorators: [
		(Story) => {
			saveOrder({
				id: "ORD-DEMO",
				item: "cortado",
				itemName: "Cortado",
				size: "medium",
				milk: "Oat",
				extras: ["Extra shot"],
				notes: "",
				name: "Sofia",
				price: 4.5,
				status: "pending",
				createdAt: new Date().toISOString(),
			});
			return (
				<MemoryRouter initialEntries={["/checkout/ORD-DEMO"]}>
					<Routes>
						<Route path="/checkout/:id" element={<Story />} />
					</Routes>
				</MemoryRouter>
			);
		},
	],
	parameters: { layout: "fullscreen" },
};
export default meta;
export const Default: StoryObj<typeof CheckoutPage> = {};
