import type { InputHTMLAttributes } from "react";

import "./Checkbox.css";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export function Checkbox({ label, id, ...rest }: CheckboxProps) {
	return (
		<label className="checkbox" htmlFor={id}>
			<input id={id} type="checkbox" {...rest} />
			<span>{label}</span>
		</label>
	);
}
