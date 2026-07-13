import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { FormField } from "../components/FormField";
import { Input, Select, Textarea } from "../components/Input";
import { RadioGroup } from "../components/RadioGroup";
import { menu } from "../data/menu";
import { makeId, saveOrder } from "../lib/storage";

const sizes = [
	{ value: "small", label: "Small", description: "8oz" },
	{ value: "medium", label: "Medium", description: "12oz" },
	{ value: "large", label: "Large", description: "16oz" },
];

const milks = ["Whole", "Skim", "Oat", "Almond", "Soy", "None"];
const extras = ["Extra shot", "Decaf", "Vanilla syrup", "Caramel syrup", "Whipped cream"];

export function OrderPage() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const preset = params.get("item") ?? "cortado";

	const [itemId, setItemId] = useState(preset);
	const [size, setSize] = useState("medium");
	const [milk, setMilk] = useState("Oat");
	const [checked, setChecked] = useState<Record<string, boolean>>({});
	const [notes, setNotes] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const item = useMemo(() => menu.find((m) => m.id === itemId) ?? menu[0], [itemId]);

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		if (!name.trim()) {
			setError("Please enter the name for the order.");
			return;
		}
		setSubmitting(true);
		const id = makeId("ORD");
		saveOrder({
			id,
			item: item.id,
			itemName: item.name,
			size,
			milk,
			extras: Object.entries(checked)
				.filter(([, v]) => v)
				.map(([k]) => k),
			notes,
			name: name.trim(),
			price: item.price,
			status: "pending",
			createdAt: new Date().toISOString(),
		});
		navigate(`/confirmation/${id}`);
	}

	return (
		<section className="stack" style={{ maxWidth: 560 }}>
			<h2 style={{ margin: 0 }}>Customize your drink</h2>
			<form onSubmit={onSubmit} noValidate data-testid="order-form">
				<FormField label="Drink" htmlFor="item" required>
					<Select id="item" value={itemId} onChange={(e) => setItemId(e.target.value)}>
						{menu.map((m) => (
							<option key={m.id} value={m.id}>
								{m.name} — ${m.price.toFixed(2)}
							</option>
						))}
					</Select>
				</FormField>

				<FormField label="Size" required>
					<RadioGroup name="size" value={size} onChange={setSize} options={sizes} />
				</FormField>

				<FormField label="Milk" htmlFor="milk">
					<Select id="milk" value={milk} onChange={(e) => setMilk(e.target.value)}>
						{milks.map((m) => (
							<option key={m} value={m}>
								{m}
							</option>
						))}
					</Select>
				</FormField>

				<FormField label="Extras">
					<div className="row">
						{extras.map((x) => (
							<Checkbox
								key={x}
								id={`extra-${x}`}
								label={x}
								checked={!!checked[x]}
								onChange={(e) => setChecked((c) => ({ ...c, [x]: e.target.checked }))}
							/>
						))}
					</div>
				</FormField>

				<FormField label="Notes" htmlFor="notes" hint="Special requests, allergies, etc.">
					<Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
				</FormField>

				<FormField
					label="Name for the order"
					htmlFor="name"
					required
					error={error && !name ? error : undefined}
				>
					<Input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="e.g. Sofia"
					/>
				</FormField>

				{error && name && (
					<div style={{ marginBottom: 16 }}>
						<Alert tone="danger" title="Order failed">
							{error}
						</Alert>
					</div>
				)}

				<div className="row" style={{ justifyContent: "space-between" }}>
					<div style={{ color: "var(--ink-2)" }}>
						Total: <strong style={{ color: "var(--ink)" }}>${item.price.toFixed(2)}</strong>
					</div>
					<Button type="submit" disabled={submitting}>
						{submitting ? "Placing…" : "Place order"}
					</Button>
				</div>
			</form>
		</section>
	);
}
