import { RangePickerProps } from 'antd/es/date-picker';

interface IDateRangePickerProps extends RangePickerProps {
  onChange: (_: any, dateStrings: [string, string]) => void;
  label: string;
  fullWidth?: boolean;
  required?: boolean;
}

export { IDateRangePickerProps };
