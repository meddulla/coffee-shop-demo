import type { ReactNode } from "react";

import "./Alert.css";

type Tone = "info" | "success" | "danger";

export interface AlertProps {
	tone?: Tone;
	title?: string;
	children: ReactNode;
}

export function Alert({ tone = "info", title, children }: AlertProps) {
	return (
		<div className={`alert alert-${tone}`} role="alert">
			{title && <div className="alert-title">{title}</div>}
			<div>{children}</div>
		</div>
	);
}
