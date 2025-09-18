import { useState } from 'react';

interface IUseSortFilterProps {
  initialFilter: string;
}

export const useSortFilter = ({
  initialFilter,
}: Partial<IUseSortFilterProps>) => {
  const [filterValue, setFilterValue] = useState<string>(initialFilter || '');

  return {
    setFilterValue,
    filterValue,
  };
};
