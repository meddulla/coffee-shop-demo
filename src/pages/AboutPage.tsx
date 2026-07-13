import { Link } from "react-router-dom";

import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export function AboutPage() {
	return (
		<section className="stack" style={{ maxWidth: 720 }}>
			<div>
				<Badge tone="accent">Our story</Badge>
				<h2 style={{ margin: "12px 0 4px" }}>Small shop, big beans.</h2>
				<p style={{ color: "var(--ink-2)", marginTop: 4 }}>
					Bean & Brew started as a weekend market stall in 2019. Six years later we still roast
					every batch ourselves in a converted garage around the corner from the café.
				</p>
			</div>

			<div className="grid">
				<Card title="The beans" subtitle="Traceable to the farm">
					<p style={{ margin: 0, color: "var(--ink-2)" }}>
						We buy green coffee directly from producers in Colombia, Ethiopia, Guatemala and Kenya.
						No middlemen, no guesswork.
					</p>
				</Card>
				<Card title="The roast" subtitle="Small batches, weekly">
					<p style={{ margin: 0, color: "var(--ink-2)" }}>
						Anything you drink here was roasted within the last 10 days. We log every profile and
						cup every batch before it hits the bar.
					</p>
				</Card>
				<Card title="The people" subtitle="Ten baristas, one dog">
					<p style={{ margin: 0, color: "var(--ink-2)" }}>
						Our team has been together for years. Ask any of them for a recommendation — they know
						the menu inside out.
					</p>
				</Card>
			</div>

			<div className="row" style={{ marginTop: 8 }}>
				<Link to="/menu">
					<Button size="lg">Order a drink</Button>
				</Link>
				<Link to="/feedback">
					<Button size="lg" variant="secondary">
						Say hello
					</Button>
				</Link>
			</div>
		</section>
	);
}
