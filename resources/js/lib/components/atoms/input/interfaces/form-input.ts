import { InputProps } from "antd";
import { BaseSyntheticEvent } from "react";

export interface IFormInputProps extends InputProps {
	extraOnChange?: (event: BaseSyntheticEvent) => void;
	label?: string;
}
