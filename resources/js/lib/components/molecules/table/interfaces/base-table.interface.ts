import { TablePaginationConfig, TableProps } from "antd";
import { ReactNode } from "react";

export type TOrder = "ASC" | "DESC";

export interface IPaginateRequest {
	q?: string;
	perPage?: number;
	currentPage?: number;
	order?: TOrder;
	orderBy?: string;
}

export interface IBaseTableProps {
	onPageChange?: TablePaginationConfig["onChange"];
	onSizeChange?: TablePaginationConfig["onShowSizeChange"];
	onTableChange?: TableProps<any>["onChange"];
	onSearchChange?: (v: string | any) => void;
	columns: TableProps<any>["columns"];
	data: TableProps<any>["dataSource"] | any;
	withSearch?: boolean;
	actionComponent?: ReactNode;
	pageSizeOptions?: number[];
	withQuickPageJumper?: boolean;
	order?: string;
	orderBy?: string;
	className?: string;
	isLoading?: boolean;
	total?: number;
	currentPage?: number;
	pageSize?: number;
	onSortChange?: (
		orderBy: string | any,
		orderDirection: "descend" | "ascend" | any
	) => void;
}
