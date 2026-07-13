import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Alert } from "../components/Alert";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { listOrders, type StoredOrder } from "../lib/storage";

export function OrdersPage() {
	const [orders, setOrders] = useState<StoredOrder[]>([]);

	useEffect(() => {
		setOrders(listOrders());
	}, []);

	if (orders.length === 0) {
		return (
			<section className="stack" style={{ maxWidth: 560 }}>
				<h2 style={{ margin: 0 }}>My orders</h2>
				<Alert tone="info" title="No orders yet">
					You haven't placed any orders in this browser.
				</Alert>
				<Link to="/menu">
					<Button>Start an order</Button>
				</Link>
			</section>
		);
	}

	return (
		<section className="stack">
			<div>
				<h2 style={{ margin: 0 }}>My orders</h2>
				<p style={{ color: "var(--ink-2)", marginTop: 4 }}>Stored locally in this browser.</p>
			</div>

			<div className="grid" data-testid="orders-grid">
				{orders.map((o) => (
					<Card
						key={o.id}
						title={o.itemName}
						subtitle={`${o.id} · ${new Date(o.createdAt).toLocaleString()}`}
						footer={
							<>
								<strong>${o.price.toFixed(2)}</strong>
								<Link to={`/confirmation/${o.id}`}>
									<Button size="sm" variant="secondary">
										View
									</Button>
								</Link>
							</>
						}
					>
						<div className="row" style={{ marginBottom: 8 }}>
							<Badge tone={o.status === "paid" ? "success" : "warning"}>
								{o.status === "paid" ? "Paid" : "Pending payment"}
							</Badge>
						</div>
						<div style={{ fontSize: 13, color: "var(--ink-2)" }}>
							For {o.name} · {o.size} · {o.milk}
							{o.extras.length > 0 && ` · ${o.extras.join(", ")}`}
						</div>
					</Card>
				))}
			</div>
		</section>
	);
}
