import { defineConfig } from "oxlint";

export default defineConfig({
	ignorePatterns: ["dist", "storybook-static", ".wrangler"],

	options: {
		maxWarnings: 20,
		reportUnusedDisableDirectives: "deny",
	},

	plugins: ["typescript", "unicorn", "oxc", "react"],

	env: {
		browser: true,
		builtin: true,
	},

	categories: {
		correctness: "error",
	},

	rules: {
		"no-console": "warn",
	},
});
