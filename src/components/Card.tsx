import type { ReactNode } from "react";

import "./Card.css";

export interface CardProps {
	title?: ReactNode;
	subtitle?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
}

export function Card({ title, subtitle, footer, children }: CardProps) {
	return (
		<div className="card">
			{(title || subtitle) && (
				<div className="card-header">
					{title && <div className="card-title">{title}</div>}
					{subtitle && <div className="card-subtitle">{subtitle}</div>}
				</div>
			)}
			<div className="card-body">{children}</div>
			{footer && <div className="card-footer">{footer}</div>}
		</div>
	);
}
