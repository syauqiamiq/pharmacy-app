import { TablePaginationConfig, TableProps } from 'antd';
import { ReactNode } from 'react';

export type TSort = 'ASC' | 'DESC';
export type TOptionalChange<T extends object = object> = <
  K extends keyof (IPaginateRequest & T)
>(
  key: K,
  value: (IPaginateRequest & T)[K]
) => void;

export interface IPaginateRequest {
  search?: string;
  limit?: number;
  page?: number;
  sort?: TSort;
  orderBy?: string;
}

export interface IBaseTableProps<T = unknown> {
  onPageChange?: TablePaginationConfig['onChange'];
  onSizeChange?: TablePaginationConfig['onShowSizeChange'];
  onTableChange?: TableProps<T>['onChange'];
  onSearchChange?: (v: string) => void;
  columns: TableProps<T>['columns'];
  data: TableProps<T>['dataSource'];
  rowKey?: string | ((record: T) => string);
  rowSelection?: TableProps<T>['rowSelection'];
  showHeader?: boolean;
  withSearch?: boolean;
  filterComponents?: ReactNode;
  actionComponent?: ReactNode;
  pageSizeOptions?: number[];
  withQuickPageJumper?: boolean;
  sort?: string;
  orderBy?: string;
  className?: string;
  isLoading?: boolean;
  total?: number;
  currentPage?: number;
  pageSize?: number;
  onSortChange?: (
    orderBy: string | any,
    orderDirection: 'descend' | 'ascend' | any
  ) => void;
  // Infinite scroll props
  enableInfiniteScroll?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  loadMoreText?: string;
  noMoreDataText?: string;
  infiniteScrollType?: 'button' | 'scroll';
  maxHeight?: number | string;
  scrollThreshold?: number;
  onRow?: TableProps<T>['onRow'];
  rowClassName?: TableProps<T>['rowClassName'];
  expandable?: TableProps<T>['expandable'];
  scroll?: TableProps<T>['scroll'];
}
