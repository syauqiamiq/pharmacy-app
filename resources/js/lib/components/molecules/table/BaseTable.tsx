import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import clsx from "clsx";
import { IBaseTableProps } from "./interfaces";
import { useMemo } from "react";

/**
 * Base Table
 * Component BaseTable ini digunakan sebagai reusable tabel pada seluruh project Gihon,
 * Component ini dapat diintergrasikan menjadi Async Table dengan kombinasi dengan useTableAsync hooks
 */
const BaseTable = ({
	className,
	data,
	columns,
	onPageChange,
	pageSizeOptions = undefined,
	onSizeChange,
	withQuickPageJumper = false,
	onTableChange,
	isLoading = false,
	total = undefined,
	onSearchChange = () => {},
	withSearch = false,
	actionComponent,
	currentPage = undefined,
	pageSize = undefined,
	order = "DESC",
	orderBy,
	onSortChange,
}: IBaseTableProps) => {
	const enhancedColumns = useMemo(
		() =>
			columns?.map((column: any) => {
				if (column.sorter) {
					return {
						...column,
						sortOrder:
							column.dataIndex === orderBy
								? order === "ASC"
									? "ascend"
									: "descend"
								: undefined,
					};
				}
				return column;
			}),
		[columns, orderBy, order]
	);

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 w-full mb-6 gap-3">
				<div>
					{withSearch && (
						<Input
							className="w-full md:w-64"
							placeholder="Search..."
							onChange={(e) => onSearchChange(e.target?.value)}
							prefix={<SearchOutlined />}
						/>
					)}
				</div>
				<div>{actionComponent}</div>
			</div>
			<Table
				className={clsx(className)}
				dataSource={data}
				columns={enhancedColumns}
				onChange={(pagination, filters, sorter, extra) => {
					if (Array.isArray(sorter)) {
						// Multiple Sorter Logic
					} else {
						// Single Sorter Logic
						if (onSortChange) {
							onSortChange(sorter.field, sorter.order);
						}
					}
					if (onTableChange) {
						onTableChange(pagination, filters, sorter, extra);
					}
				}}
				loading={isLoading}
				scroll={{ x: "max-content" }}
				pagination={{
					responsive: true,
					showSizeChanger: pageSizeOptions ? true : false,
					pageSizeOptions: pageSizeOptions,
					onChange: onPageChange,
					current: currentPage,
					onShowSizeChange: onSizeChange,
					pageSize: pageSize,
					total: total,
					showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total}`,
					showQuickJumper: withQuickPageJumper,
				}}
			/>
		</div>
	);
};

export default BaseTable;
