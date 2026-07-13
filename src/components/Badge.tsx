import type { ReactNode } from "react";

import "./Badge.css";

type Tone = "default" | "success" | "warning" | "danger" | "accent";

export interface BadgeProps {
	tone?: Tone;
	children: ReactNode;
}

export function Badge({ tone = "default", children }: BadgeProps) {
	return <span className={`badge badge-${tone}`}>{children}</span>;
}
