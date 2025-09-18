import { TextAreaProps } from "antd/es/input";
import { BaseSyntheticEvent } from "react";

export interface IFormInputAreaProps extends TextAreaProps {
  extraOnChange?: (event: BaseSyntheticEvent) => void;
  label?: string;
}
