import { defineConfig } from "oxfmt";

export default defineConfig({
	ignorePatterns: ["dist", "storybook-static", ".wrangler"],

	useTabs: true,
	printWidth: 100,

	sortPackageJson: true,
	sortImports: {
		groups: [
			"builtin",
			{ newlinesBetween: false },
			"external",
			"internal",
			{ newlinesBetween: false },
			"subpath",
			"parent",
			"sibling",
			{ newlinesBetween: false },
			"index",
			"style",
			"unknown",
		],
		type: "alphabetical",
		order: "asc",
	},
});
