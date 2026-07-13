import type {
	InputHTMLAttributes,
	TextareaHTMLAttributes,
	SelectHTMLAttributes,
	ReactNode,
} from "react";

import "./Input.css";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return <input className="input" {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return <textarea className="input textarea" {...props} />;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	children: ReactNode;
}
export function Select({ children, ...rest }: SelectProps) {
	return (
		<select className="input select" {...rest}>
			{children}
		</select>
	);
}
