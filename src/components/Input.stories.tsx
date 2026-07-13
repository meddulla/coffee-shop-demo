import type { Meta, StoryObj } from "@storybook/react";

import { FormField } from "./FormField";
import { Input, Textarea, Select } from "./Input";

const meta: Meta = { title: "Components/Input" };
export default meta;

export const Text: StoryObj = {
	render: () => (
		<FormField label="Full name" required htmlFor="name">
			<Input id="name" placeholder="Jane Doe" />
		</FormField>
	),
};

export const WithError: StoryObj = {
	render: () => (
		<FormField label="Email" error="Enter a valid email" htmlFor="email">
			<Input id="email" defaultValue="not-an-email" />
		</FormField>
	),
};

export const TextareaStory: StoryObj = {
	name: "Textarea",
	render: () => (
		<FormField label="Notes" hint="Any special requests?" htmlFor="notes">
			<Textarea id="notes" placeholder="Extra hot please..." />
		</FormField>
	),
};

export const SelectStory: StoryObj = {
	name: "Select",
	render: () => (
		<FormField label="Milk" htmlFor="milk">
			<Select id="milk" defaultValue="oat">
				<option value="whole">Whole</option>
				<option value="skim">Skim</option>
				<option value="oat">Oat</option>
				<option value="almond">Almond</option>
			</Select>
		</FormField>
	),
};
