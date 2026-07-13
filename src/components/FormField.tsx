import type { ReactNode } from "react";

import "./FormField.css";

export interface FormFieldProps {
	label: string;
	htmlFor?: string;
	error?: string;
	hint?: string;
	required?: boolean;
	children: ReactNode;
}

export function FormField({ label, htmlFor, error, hint, required, children }: FormFieldProps) {
	return (
		<div className={`form-field${error ? " has-error" : ""}`}>
			<label htmlFor={htmlFor} className="form-field-label">
				{label}
				{required && <span aria-hidden="true"> *</span>}
			</label>
			{children}
			{hint && !error && <div className="form-field-hint">{hint}</div>}
			{error && (
				<div className="form-field-error" role="alert">
					{error}
				</div>
			)}
		</div>
	);
}
