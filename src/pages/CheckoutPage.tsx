import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Checkbox } from "../components/Checkbox";
import { FormField } from "../components/FormField";
import { Input, Select } from "../components/Input";
import { getOrder, markPaid, type StoredOrder } from "../lib/storage";

type Errors = Partial<Record<"email" | "card" | "expiry" | "cvc" | "zip", string>>;

// Luhn algorithm for credit card number validation
function luhnValid(num: string): boolean {
	const digits = num.replace(/\D/g, "");
	if (digits.length < 12 || digits.length > 19) return false;
	let sum = 0;
	let alt = false;
	for (let i = digits.length - 1; i >= 0; i--) {
		let n = Number(digits[i]);
		if (alt) {
			n *= 2;
			if (n > 9) n -= 9;
		}
		sum += n;
		alt = !alt;
	}
	return sum % 10 === 0;
}

function expiryValid(exp: string): boolean {
	const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(exp);
	if (!m) return false;
	const month = Number(m[1]);
	const year = 2000 + Number(m[2]);
	const now = new Date();
	const expDate = new Date(year, month, 0, 23, 59, 59);
	return expDate >= now;
}

export function CheckoutPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [order, setOrder] = useState<StoredOrder | undefined>();
	const [loaded, setLoaded] = useState(false);

	const [email, setEmail] = useState("");
	const [card, setCard] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvc, setCvc] = useState("");
	const [zip, setZip] = useState("");
	const [country, setCountry] = useState("US");
	const [terms, setTerms] = useState(false);
	const [errors, setErrors] = useState<Errors>({});
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	useEffect(() => {
		if (id) setOrder(getOrder(id));
		setLoaded(true);
	}, [id]);

	if (!loaded) return null;

	if (!order) {
		return (
			<section className="stack" style={{ maxWidth: 520 }}>
				<Alert tone="danger" title="Order not found">
					Can't check out an order that doesn't exist.
				</Alert>
				<Link to="/menu">
					<Button variant="secondary">← Back to menu</Button>
				</Link>
			</section>
		);
	}

	if (order.status === "paid") {
		return (
			<section className="stack" style={{ maxWidth: 520 }}>
				<Alert tone="success" title="Already paid">
					This order was already checked out.
				</Alert>
				<Link to={`/confirmation/${order.id}`}>
					<Button>View confirmation</Button>
				</Link>
			</section>
		);
	}

	function validate(): Errors {
		const e: Errors = {};
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "Enter a valid email.";
		const digits = card.replace(/\s/g, "");
		if (!/^\d+$/.test(digits)) e.card = "Card must be digits only.";
		else if (digits.length < 12 || digits.length > 19) e.card = "Card must be 12–19 digits.";
		else if (!luhnValid(digits)) e.card = "Card number is invalid.";
		if (!expiryValid(expiry)) e.expiry = "Format MM/YY and not expired.";
		if (!/^\d{3,4}$/.test(cvc)) e.cvc = "3 or 4 digits.";
		if (!/^\w{3,10}$/.test(zip)) e.zip = "Enter a postal code.";
		return e;
	}

	function onSubmit(ev: React.FormEvent) {
		ev.preventDefault();
		setServerError(null);
		const v = validate();
		setErrors(v);
		if (Object.keys(v).length > 0) return;
		if (!terms) {
			setServerError("You must accept the terms.");
			return;
		}
		setSubmitting(true);
		const digits = card.replace(/\s/g, "");
		const updated = markPaid(order!.id, {
			email,
			last4: digits.slice(-4),
			country,
		});
		if (!updated) {
			setSubmitting(false);
			setServerError("Could not save payment.");
			return;
		}
		// small delay to feel like processing
		setTimeout(() => navigate(`/confirmation/${order!.id}`), 300);
	}

	return (
		<section className="stack" style={{ maxWidth: 480 }}>
			<h2 style={{ margin: 0 }}>Checkout</h2>

			<Card title={order.itemName} subtitle={`Order ${order.id} · for ${order.name}`}>
				<div style={{ fontSize: 14, color: "var(--ink-2)" }}>
					{order.size} · {order.milk}
					{order.extras.length > 0 && ` · ${order.extras.join(", ")}`}
				</div>
				<div style={{ marginTop: 8, fontSize: 18 }}>
					<strong>${order.price.toFixed(2)}</strong>
				</div>
			</Card>

			<form onSubmit={onSubmit} noValidate data-testid="checkout-form">
				<FormField label="Email" htmlFor="email" required error={errors.email}>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="you@example.com"
					/>
				</FormField>

				<FormField label="Card number" htmlFor="card" required error={errors.card}>
					<Input
						id="card"
						inputMode="numeric"
						value={card}
						onChange={(e) => setCard(e.target.value)}
						placeholder="4242 4242 4242 4242"
					/>
				</FormField>

				<div className="row" style={{ gap: 12 }}>
					<div style={{ flex: 1 }}>
						<FormField label="Expiry" htmlFor="expiry" required error={errors.expiry}>
							<Input
								id="expiry"
								value={expiry}
								onChange={(e) => setExpiry(e.target.value)}
								placeholder="MM/YY"
							/>
						</FormField>
					</div>
					<div style={{ flex: 1 }}>
						<FormField label="CVC" htmlFor="cvc" required error={errors.cvc}>
							<Input
								id="cvc"
								inputMode="numeric"
								value={cvc}
								onChange={(e) => setCvc(e.target.value)}
								placeholder="123"
							/>
						</FormField>
					</div>
				</div>

				<div className="row" style={{ gap: 12 }}>
					<div style={{ flex: 1 }}>
						<FormField label="Country" htmlFor="country">
							<Select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
								<option value="US">United States</option>
								<option value="ES">Spain</option>
								<option value="UK">United Kingdom</option>
								<option value="DE">Germany</option>
								<option value="PT">Portugal</option>
							</Select>
						</FormField>
					</div>
					<div style={{ flex: 1 }}>
						<FormField label="Postal code" htmlFor="zip" required error={errors.zip}>
							<Input
								id="zip"
								value={zip}
								onChange={(e) => setZip(e.target.value)}
								placeholder="94103"
							/>
						</FormField>
					</div>
				</div>

				<FormField label="">
					<Checkbox
						id="terms"
						label="I agree to the terms and privacy policy"
						checked={terms}
						onChange={(e) => setTerms(e.target.checked)}
					/>
				</FormField>

				{serverError && (
					<div style={{ marginBottom: 16 }}>
						<Alert tone="danger" title="Something went wrong">
							{serverError}
						</Alert>
					</div>
				)}

				<Button type="submit" size="lg" disabled={submitting}>
					{submitting ? "Processing…" : `Pay $${order.price.toFixed(2)}`}
				</Button>
			</form>
		</section>
	);
}
