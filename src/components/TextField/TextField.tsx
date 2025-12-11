import React, { ChangeEvent } from "react";
import "./TextField.css";

export interface TextFieldProps {
	/** The value of the text field */
	value?: string;
	/** Placeholder text to display when the field is empty */
	placeholder?: string;
	/** Label for the text field */
	label?: string;
	/** Whether the field is disabled */
	disabled?: boolean;
	/** Function called when the input value changes */
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	/** Additional CSS class names */
	className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
	value,
	placeholder,
	label,
	disabled = false,
	onChange,
	className = "",
}) => {
	return (
		<div className={`text-field-container ${className}`}>
			{label && <label className="text-field-label">{label}</label>}
			<input
				type="text"
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={onChange}
				className="text-field-input"
			/>
		</div>
	);
};

export default TextField;
