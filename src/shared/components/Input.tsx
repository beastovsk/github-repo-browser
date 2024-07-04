import React from "react";

interface InputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	placeholder = "",
	className = "",
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<input
			type="text"
			value={value}
			onChange={handleChange}
			placeholder={placeholder}
			className={`input ${className}`}
		/>
	);
};

export default Input;
