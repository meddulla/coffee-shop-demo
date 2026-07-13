export interface StoredOrder {
	id: string;
	item: string;
	itemName: string;
	size: string;
	milk: string;
	extras: string[];
	notes: string;
	name: string;
	price: number;
	status: "pending" | "paid";
	createdAt: string;
	paidAt?: string;
	payment?: {
		email: string;
		last4: string;
		country: string;
	};
}

const KEY = "beanandbrew:orders";

function readAll(): StoredOrder[] {
	if (typeof localStorage === "undefined") return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function writeAll(orders: StoredOrder[]): void {
	if (typeof localStorage === "undefined") return;
	localStorage.setItem(KEY, JSON.stringify(orders));
}

export function makeId(prefix: string): string {
	const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
	return `${prefix}-${rand}`;
}

export function listOrders(): StoredOrder[] {
	return readAll().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getOrder(id: string): StoredOrder | undefined {
	return readAll().find((o) => o.id === id);
}

export function saveOrder(order: StoredOrder): void {
	const all = readAll();
	const idx = all.findIndex((o) => o.id === order.id);
	if (idx >= 0) all[idx] = order;
	else all.push(order);
	writeAll(all);
}

export function markPaid(
	id: string,
	payment: { email: string; last4: string; country: string },
): StoredOrder | undefined {
	const all = readAll();
	const order = all.find((o) => o.id === id);
	if (!order) return undefined;
	order.status = "paid";
	order.paidAt = new Date().toISOString();
	order.payment = payment;
	writeAll(all);
	return order;
}
