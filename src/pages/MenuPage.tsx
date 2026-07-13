import { Link } from "react-router-dom";

import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { menu } from "../data/menu";

export function MenuPage() {
	return (
		<section className="stack">
			<div>
				<h2 style={{ margin: 0 }}>Menu</h2>
				<p style={{ color: "var(--ink-2)", marginTop: 4 }}>
					Pick a drink and customize it on the next page.
				</p>
			</div>
			<div className="grid" data-testid="menu-grid">
				{menu.map((item) => (
					<Card
						key={item.id}
						title={item.name}
						subtitle={item.description}
						footer={
							<>
								<strong>${item.price.toFixed(2)}</strong>
								<Link to={`/order?item=${item.id}`}>
									<Button size="sm">Customize</Button>
								</Link>
							</>
						}
					>
						{item.tag && <Badge tone={item.tone}>{item.tag}</Badge>}
					</Card>
				))}
			</div>
		</section>
	);
}
