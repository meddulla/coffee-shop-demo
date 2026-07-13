import "./RadioGroup.css";

export interface RadioOption {
	value: string;
	label: string;
	description?: string;
}

export interface RadioGroupProps {
	name: string;
	value: string;
	options: RadioOption[];
	onChange: (value: string) => void;
}

export function RadioGroup({ name, value, options, onChange }: RadioGroupProps) {
	return (
		<div className="radio-group" role="radiogroup">
			{options.map((opt) => (
				<label key={opt.value} className={`radio-item${value === opt.value ? " selected" : ""}`}>
					<input
						type="radio"
						name={name}
						value={opt.value}
						checked={value === opt.value}
						onChange={() => onChange(opt.value)}
					/>
					<div>
						<div className="radio-label">{opt.label}</div>
						{opt.description && <div className="radio-description">{opt.description}</div>}
					</div>
				</label>
			))}
		</div>
	);
}
