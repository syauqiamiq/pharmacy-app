import { DatePicker as BaseDatePicker } from 'antd';
import dayjs from 'dayjs';
import { useController, useFormContext } from 'react-hook-form';
import { IDatePickerProps } from './interfaces';

const DatePicker = ({
  name = '',
  label,
  fullWidth,
  required,
  extraOnChange,
  ...rest
}: IDatePickerProps) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const { error } = fieldState;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <div className="text-xs mb-2">
          {required && <span className="text-red-500">* </span>}
          {label}
        </div>
      )}
      <BaseDatePicker
        className={fullWidth ? 'w-full' : ''}
        status={error && 'error'}
        onChange={(date, dateString) => {
          if (date) {
            field.onChange(date.toISOString());
            extraOnChange?.(date.toISOString(), dateString);
          } else {
            field.onChange(null);
          }
        }}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        value={field.value ? dayjs(field.value) : null}
        {...rest}
      />
      {error && <div className="text-xs text-red-500">{error.message}</div>}
    </div>
  );
};

export { DatePicker };
