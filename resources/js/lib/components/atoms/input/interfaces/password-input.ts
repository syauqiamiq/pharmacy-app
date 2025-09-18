import { InputProps } from "antd";
import { BaseSyntheticEvent } from "react";

export interface IPasswordInputProps extends InputProps {
	extraOnChange?: (event: BaseSyntheticEvent) => void;
	label?: string;
}
