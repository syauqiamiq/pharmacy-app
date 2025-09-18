import { SelectProps } from "antd";
import { BaseSyntheticEvent } from "react";

export interface IFormSelectInputProps extends SelectProps {
	extraOnChange?: (event: BaseSyntheticEvent) => void;
	name: string;
	label?: string;
	onSearch?: (value: string) => void | undefined;
}
