import { BaseSyntheticEvent, useCallback } from "react";

import { Input } from "antd";
import { useController, useFormContext } from "react-hook-form";

import { IFormInputAreaProps } from "./interfaces";

const { TextArea } = Input;
const FormInputArea = ({
  extraOnChange,
  name = "",
  label,
  rows = 4,
  ...rest
}: IFormInputAreaProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const handleCustomChange = useCallback(
    (input: BaseSyntheticEvent) => {
      field.onChange(input);
      if (extraOnChange) {
        extraOnChange(input);
      }
    },
    [field, extraOnChange]
  );
  return (
    <div>
      {label && <div className="text-xs mb-2">{label}</div>}
      <TextArea
        {...rest}
        rows={rows}
        status={error && "error"}
        onChange={handleCustomChange}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        value={field.value}
      />
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
};

export default FormInputArea;
