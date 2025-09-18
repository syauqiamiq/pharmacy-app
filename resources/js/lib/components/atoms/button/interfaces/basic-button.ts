export interface IBasicButtonProps {
	title: string;
	type?: "button" | "reset" | "submit";
	size?: "small" | "middle" | "large";
	className?: string;
	variant?: "contained" | "outlined" | "text";
	onClick?: () => void;
}
