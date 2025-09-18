import { useState, useEffect, useCallback } from 'react';
import { IPaginateRequest, TSort } from '../components/molecules/table/interfaces';



export interface ITableAsyncHookProps<T> {
  initialOrderBy?: string;
  initialSort?: TSort;
  initialSearch?: string;
  initialValues?: Partial<T>;
  initialLimit?: number;
  enableInfiniteScroll?: boolean;
}

export const useTableAsync = <T extends object = object>({
  initialOrderBy = undefined,
  initialSort = undefined,
  initialSearch = '',
  initialValues = {},
  initialLimit = 10,
  enableInfiniteScroll = false,
}: ITableAsyncHookProps<T> = {}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [paginateRequest, setPaginateRequest] = useState<IPaginateRequest & T>({
    page: 1,
    limit: initialLimit,
    sort: initialSort,
    orderBy: initialOrderBy,
    search: initialSearch,
    ...initialValues,
  } as IPaginateRequest & T);

  // Update paginateRequest when searchQuery changes
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setPaginateRequest((prev) => ({
          ...prev,
          search: searchQuery,
          page: enableInfiniteScroll ? prev.page : 1, // Don't reset page for infinite scroll
        }));
      },
      enableInfiniteScroll ? 500 : 1000
    ); // Faster debounce for infinite scroll
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [searchQuery, enableInfiniteScroll]);

  // Handle changes in pagination
  const handlePageChange = useCallback((page: number, limit: number) => {
    setPaginateRequest((prev) => ({
      ...prev,
      limit: limit,
      page: page,
    }));
  }, []);

  // Handle infinite scroll reset (for search/filter changes)
  const handleInfiniteReset = useCallback(() => {
    if (enableInfiniteScroll) {
      setPaginateRequest((prev) => ({
        ...prev,
        page: 1,
      }));
    }
  }, [enableInfiniteScroll]);

  const handleOptionalChange = useCallback(
    <K extends keyof (IPaginateRequest & T)>(
      key: K,
      value: (IPaginateRequest & T)[K]
    ) => {
      setPaginateRequest((prevState) => ({
        ...prevState,
        page: enableInfiniteScroll ? prevState.page : 1, // Don't reset page for infinite scroll
        [key]: value,
      }));
    },
    [enableInfiniteScroll]
  );

  // Handle sorting change
  const handleSortChange = useCallback(
    (orderBy: string | any, orderDirection: 'descend' | 'ascend' | any) => {
      setPaginateRequest((prev) => {
        const prevOrder = prev.sort;
        const prevOrderBy = prev.orderBy;

        const fixedOrder =
          orderDirection === 'descend'
            ? 'DESC'
            : orderDirection === 'ascend'
            ? 'ASC'
            : undefined;

        // Check if order or orderBy has actually changed
        if (prevOrder !== fixedOrder || prevOrderBy !== orderBy) {
          return {
            ...prev,
            sort: fixedOrder,
            orderBy: orderBy,
            page: enableInfiniteScroll ? prev.page : 1, // Don't reset page for infinite scroll
          };
        }

        // If no change in order or orderBy, return previous state unchanged
        return prev;
      });
    },
    [enableInfiniteScroll]
  );

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return {
    paginateRequest,
    searchQuery,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    handleOptionalChange,
    handleInfiniteReset,
    setSearchQuery,
    setPaginateRequest,
    enableInfiniteScroll,
  };
};
