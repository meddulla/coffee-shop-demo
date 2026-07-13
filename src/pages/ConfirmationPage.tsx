import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Alert } from "../components/Alert";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { getOrder, type StoredOrder } from "../lib/storage";

export function ConfirmationPage() {
	const { id } = useParams();
	const [order, setOrder] = useState<StoredOrder | undefined>();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (id) setOrder(getOrder(id));
		setLoaded(true);
	}, [id]);

	if (!loaded) return null;

	if (!order) {
		return (
			<section className="stack" style={{ maxWidth: 520 }}>
				<Alert tone="danger" title="Order not found">
					We couldn't find order <code>{id}</code>. It may have been cleared from this browser.
				</Alert>
				<Link to="/menu">
					<Button variant="secondary">← Back to menu</Button>
				</Link>
			</section>
		);
	}

	const isPaid = order.status === "paid";

	return (
		<section className="stack" style={{ maxWidth: 560 }}>
			<Alert
				tone={isPaid ? "success" : "info"}
				title={isPaid ? "Payment received" : "Order placed"}
			>
				{isPaid ? (
					<>
						Order <code>{order.id}</code> is paid and being prepared. See you at the counter!
					</>
				) : (
					<>
						Order <code>{order.id}</code> is saved. Complete checkout to send it to the barista.
					</>
				)}
			</Alert>

			<Card
				title={order.itemName}
				subtitle={`For ${order.name}`}
				footer={
					<>
						<strong>${order.price.toFixed(2)}</strong>
						<Badge tone={isPaid ? "success" : "warning"}>
							{isPaid ? "Paid" : "Pending payment"}
						</Badge>
					</>
				}
			>
				<div className="stack" style={{ gap: 6, fontSize: 14, color: "var(--ink-2)" }}>
					<div>
						<strong style={{ color: "var(--ink)" }}>Size:</strong> {order.size}
					</div>
					<div>
						<strong style={{ color: "var(--ink)" }}>Milk:</strong> {order.milk}
					</div>
					{order.extras.length > 0 && (
						<div>
							<strong style={{ color: "var(--ink)" }}>Extras:</strong> {order.extras.join(", ")}
						</div>
					)}
					{order.notes && (
						<div>
							<strong style={{ color: "var(--ink)" }}>Notes:</strong> {order.notes}
						</div>
					)}
					{isPaid && order.payment && (
						<div>
							<strong style={{ color: "var(--ink)" }}>Paid with:</strong> card ending in{" "}
							{order.payment.last4}
						</div>
					)}
				</div>
			</Card>

			<div className="row">
				{!isPaid && (
					<Link to={`/checkout/${order.id}`}>
						<Button size="lg">Proceed to checkout →</Button>
					</Link>
				)}
				<Link to="/orders">
					<Button variant="secondary">My orders</Button>
				</Link>
				<Link to="/menu">
					<Button variant="ghost">Back to menu</Button>
				</Link>
			</div>
		</section>
	);
}
