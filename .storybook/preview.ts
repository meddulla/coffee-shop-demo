import type { Preview } from "@storybook/react";

import "../src/styles/global.css";

const preview: Preview = {
	parameters: {
		layout: "padded",
		controls: { expanded: true },
		backgrounds: {
			default: "bean",
			values: [
				{ name: "bean", value: "#fdf6ec" },
				{ name: "white", value: "#ffffff" },
			],
		},
	},
};

export default preview;
