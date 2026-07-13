interface Env {
	ASSETS: Fetcher;
}

function json(data: unknown, init: ResponseInit = {}): Response {
	return new Response(JSON.stringify(data), {
		...init,
		headers: {
			"content-type": "application/json",
			...init.headers,
		},
	});
}

function makeId(prefix: string): string {
	const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
	return `${prefix}-${rand}`;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			if (request.method === "OPTIONS") {
				return new Response(null, {
					headers: {
						"access-control-allow-origin": "*",
						"access-control-allow-methods": "GET, POST, OPTIONS",
						"access-control-allow-headers": "content-type",
					},
				});
			}

			try {
				if (url.pathname === "/api/orders" && request.method === "POST") {
					const body = (await request.json()) as Record<string, unknown>;
					const id = makeId("ORD");
					return json({ id, ok: true, echo: body });
				}
				if (url.pathname === "/api/checkout" && request.method === "POST") {
					const body = (await request.json()) as Record<string, unknown>;
					const id = makeId("PAY");
					return json({ id, ok: true, echo: body });
				}
				if (url.pathname === "/api/feedback" && request.method === "POST") {
					const body = (await request.json()) as Record<string, unknown>;
					const id = makeId("FB");
					return json({ id, ok: true, echo: body });
				}
				if (url.pathname === "/api/health" && request.method === "GET") {
					return json({ ok: true, version: "0.0.0" });
				}
				return json({ error: "not found" }, { status: 404 });
			} catch (err) {
				return json({ error: (err as Error).message }, { status: 500 });
			}
		}

		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
