import { useState } from "react";

import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { FormField } from "../components/FormField";
import { Input, Textarea, Select } from "../components/Input";
import { RadioGroup } from "../components/RadioGroup";

export function FeedbackPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [topic, setTopic] = useState("service");
	const [rating, setRating] = useState("5");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			const res = await fetch("/api/feedback", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, topic, rating, message }),
			});
			if (!res.ok) throw new Error("bad status");
			setStatus("ok");
			setName("");
			setEmail("");
			setMessage("");
		} catch {
			setStatus("err");
		}
	}

	return (
		<section className="stack" style={{ maxWidth: 520 }}>
			<h2 style={{ margin: 0 }}>Send us feedback</h2>
			<form onSubmit={onSubmit} data-testid="feedback-form">
				<FormField label="Name" htmlFor="fname" required>
					<Input id="fname" required value={name} onChange={(e) => setName(e.target.value)} />
				</FormField>
				<FormField label="Email" htmlFor="femail" required>
					<Input
						id="femail"
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormField>
				<FormField label="Topic" htmlFor="topic">
					<Select id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
						<option value="service">Service</option>
						<option value="drinks">Drinks</option>
						<option value="app">App / website</option>
						<option value="other">Other</option>
					</Select>
				</FormField>
				<FormField label="Rating">
					<RadioGroup
						name="rating"
						value={rating}
						onChange={setRating}
						options={[1, 2, 3, 4, 5].map((n) => ({
							value: String(n),
							label: `${n} star${n > 1 ? "s" : ""}`,
						}))}
					/>
				</FormField>
				<FormField label="Message" htmlFor="msg" required>
					<Textarea
						id="msg"
						required
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</FormField>

				{status === "ok" && (
					<div style={{ marginBottom: 16 }}>
						<Alert tone="success" title="Thanks!">
							Your feedback was submitted.
						</Alert>
					</div>
				)}
				{status === "err" && (
					<div style={{ marginBottom: 16 }}>
						<Alert tone="danger" title="Error">
							Couldn’t send. Try again.
						</Alert>
					</div>
				)}

				<Button type="submit">Submit feedback</Button>
			</form>
		</section>
	);
}
