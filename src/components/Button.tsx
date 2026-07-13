import type { ButtonHTMLAttributes, ReactNode } from "react";

import "./Button.css";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
	children: ReactNode;
}

export function Button({ variant = "primary", size = "md", children, ...rest }: ButtonProps) {
	return (
		<button className={`btn btn-${variant} btn-${size}`} {...rest}>
			{children}
		</button>
	);
}
