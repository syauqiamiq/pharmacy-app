import { BaseTable } from '@/lib/components/molecules/table';
import { handleApiErrorMessage } from '@/lib/functions/api-error-handler.function';
import { useDialog } from '@/lib/hooks/useDialog';
import { useTableAsync } from '@/lib/hooks/useTableAsync';
import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { useDeletePatient, useGetAllPatient } from '@/lib/services/patient.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { App, Button, Space } from 'antd';
import CreatePatientModal from './components/CreatePatientModal';
import EditPatientModal from './components/EditPatientModal';

const AdminPatientPage = () => {
    const { paginateRequest, handlePageChange, handleSearchChange, handleSortChange } = useTableAsync<{
        fromDate?: string;
        toDate?: string;
    }>();

    const { data: patientsData, isLoading: isLoadingPatients } = useGetAllPatient(paginateRequest);

    const { handleClickOpen: createPatientHandleClickOpen, handleClose: createPatientHandleClose, open: createPatientOpen } = useDialog();
    const {
        handleClose: editPatientHandleClose,
        open: editPatientOpen,
        setDialogState: setEditPatientDialogState,
        data: editPatientData,
    } = useDialog();

    const deletePatient = useDeletePatient();

    const isLoading = isLoadingPatients || deletePatient.isPending;

    const { message } = App.useApp();

    return (
        <>
            <DashboardLayout title="Pasien" breadcrumbItems={[{ title: 'Apoteker' }, { title: 'Pasien' }]}>
                <Space direction="vertical" size="middle" className="mt-4 w-full">
                    <BaseTable
                        withSearch
                        isLoading={isLoading}
                        actionComponent={
                            <div className="flex w-full lg:justify-end">
                                <Button type="primary" className="w-full lg:w-auto" onClick={() => createPatientHandleClickOpen()}>
                                    Tambah
                                </Button>
                            </div>
                        }
                        columns={[
                            {
                                title: 'Nama Pasien',
                                dataIndex: 'name',
                            },
                            {
                                title: 'Nomor Rekam Medis',
                                dataIndex: 'medic_record_number',
                            },
                            {
                                title: 'Aksi',
                                fixed: 'right',
                                render: (record) => {
                                    return (
                                        <Space size="middle">
                                            <EditOutlined
                                                className="!text-blue-500"
                                                onClick={() => setEditPatientDialogState({ open: true, data: record })}
                                            />
                                            <DeleteOutlined
                                                className="!text-red-500"
                                                onClick={async () =>
                                                    await deletePatient
                                                        .mutateAsync({
                                                            patient_id: record.id,
                                                        })
                                                        .then(() => {
                                                            message.success('Pasien berhasil dihapus');
                                                        })
                                                        .catch((err) => {
                                                            const errorMessage = handleApiErrorMessage(err);
                                                            message.error(errorMessage);
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
                        data={patientsData?.data || []}
                        withQuickPageJumper
                        onSortChange={handleSortChange}
                        sort={paginateRequest.sort}
                        orderBy={paginateRequest.orderBy}
                        total={patientsData?.meta?.total || 0}
                        pageSize={paginateRequest.limit}
                        currentPage={paginateRequest.page}
                        onPageChange={handlePageChange}
                        pageSizeOptions={[10, 25, 50, 100]}
                    />
                </Space>
            </DashboardLayout>
            {createPatientOpen && <CreatePatientModal open={createPatientOpen} onCancel={createPatientHandleClose} />}
            {editPatientOpen && <EditPatientModal open={editPatientOpen} onCancel={editPatientHandleClose} data={editPatientData} />}
        </>
    );
};

export default AdminPatientPage;
