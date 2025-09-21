import { BaseTable } from '@/lib/components/molecules/table';
import { getVisitStatusColor, getVisitStatusText } from '@/lib/functions/visit-helper.function';
import { useDialog } from '@/lib/hooks/useDialog';
import { useTableAsync } from '@/lib/hooks/useTableAsync';
import { IVisitResponse } from '@/lib/interfaces/services/visit.interface';
import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { useDeleteVisit, useGetAllVisit } from '@/lib/services/visit.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Tag } from 'antd';
import { format } from 'date-fns';
import CreateVisitModal from './components/CreateVisitModal';
import EditVisitModal from './components/EditVisitModal';

const AdminVisitPage = () => {
    const { paginateRequest, handlePageChange, handleSearchChange, handleSortChange } = useTableAsync<{
        fromDate?: string;
        toDate?: string;
    }>();

    const { data: visitsData, isLoading: isLoadingVisits } = useGetAllVisit(paginateRequest);

    const { handleClickOpen: createVisitHandleClickOpen, handleClose: createVisitHandleClose, open: createVisitOpen } = useDialog();
    const { handleClose: editVisitHandleClose, open: editVisitOpen, setDialogState: setEditVisitDialogState, data: editVisitData } = useDialog();

    const deleteVisit = useDeleteVisit();

    const isLoading = isLoadingVisits || deleteVisit.isPending;

    return (
        <>
            <DashboardLayout title="Kunjungan" breadcrumbItems={[{ title: 'Admin' }, { title: 'Kunjungan' }]}>
                <Space direction="vertical" size="middle" className="mt-4 w-full">
                    <BaseTable
                        withSearch
                        isLoading={isLoading}
                        actionComponent={
                            <div className="flex w-full lg:justify-end">
                                <Button type="primary" className="w-full lg:w-auto" onClick={() => createVisitHandleClickOpen()}>
                                    Tambah Kunjungan
                                </Button>
                            </div>
                        }
                        columns={[
                            {
                                title: 'Tanggal Kunjungan',
                                dataIndex: 'visit_date',
                                render: (date) => format(date, 'dd MMMM yyyy HH:mm'),
                                sorter: true,
                            },
                            {
                                title: 'Nama Pasien',
                                dataIndex: ['patient', 'name'],
                                render: (_, record) => (record as IVisitResponse).patient?.name || '-',
                            },
                            {
                                title: 'Nomor Rekam Medis',
                                dataIndex: ['patient', 'medic_record_number'],
                                render: (_, record) => (record as IVisitResponse).patient?.medic_record_number || '-',
                            },
                            {
                                title: 'Nama Dokter',
                                dataIndex: ['doctor', 'name'],
                                render: (_, record) => (record as IVisitResponse).doctor?.name || '-',
                            },
                            {
                                title: 'Spesialisasi',
                                dataIndex: ['doctor', 'specialization'],
                                render: (_, record) => (record as IVisitResponse).doctor?.specialization || '-',
                            },
                            {
                                title: 'Status',
                                dataIndex: 'status',
                                render: (status) => <Tag color={getVisitStatusColor(status)}>{getVisitStatusText(status)}</Tag>,
                            },
                            {
                                title: 'Aksi',
                                fixed: 'right',
                                render: (record) => {
                                    return (
                                        <Space size="middle">
                                            <EditOutlined
                                                className="!text-blue-500"
                                                onClick={() => setEditVisitDialogState({ open: true, data: record })}
                                            />
                                            <DeleteOutlined
                                                className="!text-red-500"
                                                onClick={async () =>
                                                    await deleteVisit.mutateAsync({
                                                        visit_id: record.id,
                                                    })
                                                }
                                            />
                                        </Space>
                                    );
                                },
                            },
                        ]}
                        rowKey="id"
                        onSearchChange={handleSearchChange}
                        data={visitsData?.data || []}
                        withQuickPageJumper
                        onSortChange={handleSortChange}
                        sort={paginateRequest.sort}
                        orderBy={paginateRequest.orderBy}
                        total={visitsData?.meta?.total || 0}
                        pageSize={paginateRequest.limit}
                        currentPage={paginateRequest.page}
                        onPageChange={handlePageChange}
                        pageSizeOptions={[10, 25, 50, 100]}
                    />
                </Space>
            </DashboardLayout>
            {createVisitOpen && <CreateVisitModal open={createVisitOpen} onCancel={createVisitHandleClose} />}
            {editVisitOpen && <EditVisitModal open={editVisitOpen} onCancel={editVisitHandleClose} data={editVisitData} />}
        </>
    );
};

export default AdminVisitPage;
