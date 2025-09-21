import { useCallback } from 'react';
import { DatePicker } from 'antd';
import { useController, useFormContext } from 'react-hook-form';
import { IDateRangePickerProps } from './interfaces';

const DateRangePicker = ({
  name = '',
  label,
  fullWidth,
  onChange,
  required,
  ...rest
}: IDateRangePickerProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  const handleCustomChange = useCallback(
    (_: unknown, dateStrings: [string, string]) => onChange(_, dateStrings),
    [onChange]
  );
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <div className="text-xs mb-2">
          {required && <span className="text-red-500">* </span>}
          {label}
        </div>
      )}
      <DatePicker.RangePicker
        {...rest}
        className={fullWidth ? 'w-full' : ''}
        status={error && 'error'}
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

export { DateRangePicker };
