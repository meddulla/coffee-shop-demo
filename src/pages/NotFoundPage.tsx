import { Link } from "react-router-dom";

import { Button } from "../components/Button";

export function NotFoundPage() {
	return (
		<section className="stack" style={{ maxWidth: 520, textAlign: "center" }}>
			<h2 style={{ fontSize: 48, margin: 0 }}>404</h2>
			<p style={{ color: "var(--ink-2)" }}>
				This page doesn't exist. Maybe you were looking for the menu?
			</p>
			<div>
				<Link to="/">
					<Button>← Back home</Button>
				</Link>
			</div>
		</section>
	);
}
