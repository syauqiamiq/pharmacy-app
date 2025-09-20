import { useCallback } from 'react';

import { Select } from 'antd';
import { useController, useFormContext } from 'react-hook-form';

import clsx from 'clsx';
import { IFormSelectInputProps } from './interfaces';

/**
 * A reusable form-select component integrated with `react-hook-form` and Ant Design's `Select`.
 * This component provides validation and handles controlled form inputs seamlessly.
 *
 * @component
 * @param {object} props - The properties passed to the component.
 * @param {string} props.name - The name of the form field. Must match the schema in `react-hook-form`.
 * @param {string} [props.label] - Optional label for the select input, displayed above the field.
 * @param {Function} [props.extraOnChange] - Optional additional handler triggered after the default `onChange` event.
 * @param {Array<object>} [props.options=[]] - Options to display in the select dropdown. Each option should follow the format `{ label: string, value: any }`.
 * @param {Function} [props.onSearch] - Callback for handling search input changes (when `showSearch` is enabled in the Select component).
 * @param {string} [props.className] - Additional custom CSS classes to style the component.
 * @param {object} [props.rest] - Additional props to be passed directly to the Ant Design `Select` component.
 *
 * @returns {JSX.Element} A controlled select input field with validation and error handling.
 *
 * */
const FormSelectInput = ({ name, label, extraOnChange, options = [], onSearch, className, ...rest }: IFormSelectInputProps) => {
    const { control } = useFormContext();
    const { field, fieldState } = useController({ name, control });
    const { error } = fieldState;

    const handleCustomChange = useCallback(
        (input: any) => {
            field.onChange(input);
            if (extraOnChange) {
                extraOnChange(input);
            }
        },
        [field, extraOnChange],
    );
    return (
        <div>
            {label && <div className="mb-2 text-xs">{label}</div>}
            <Select
                className={clsx('flex w-full', className)}
                onChange={handleCustomChange}
                onSearch={onSearch}
                options={options}
                status={error && 'error'}
                ref={field.ref}
                {...rest}
            />

            {error && <div className="text-xs text-red-500">{error.message}</div>}
        </div>
    );
};

export default FormSelectInput;
