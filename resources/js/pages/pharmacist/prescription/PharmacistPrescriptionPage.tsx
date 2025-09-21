import { BaseTable } from '@/lib/components/molecules/table';
import { getPrescriptionStatusColor, getPrescriptionStatusText } from '@/lib/functions/prescription-helper.function';
import { useTableAsync } from '@/lib/hooks/useTableAsync';
import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { useGetAllPrescription } from '@/lib/services/prescription.service';
import { EyeOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
import { Input, Space, Tag } from 'antd';

const PharmacistPrescriptionPage = () => {
    const { paginateRequest, handlePageChange, handleSearchChange, handleSortChange } = useTableAsync<{
        fromDate?: string;
        toDate?: string;
    }>();

    const { data: prescriptionsData, isLoading } = useGetAllPrescription(paginateRequest);

    return (
        <DashboardLayout title="Resep Obat" breadcrumbItems={[{ title: 'Apoteker' }, { title: 'Resep Obat' }]}>
            <Space direction="vertical" size="middle" className="mt-4 w-full">
                <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-6">
                    <div>
                        <Input.Search className="w-full" placeholder="Search..." onChange={(e) => handleSearchChange(e.target.value)} allowClear />
                    </div>
                </div>
                <BaseTable
                    isLoading={isLoading}
                    columns={[
                        {
                            title: 'Status',
                            dataIndex: 'status',
                            render: (status) => {
                                return <Tag color={getPrescriptionStatusColor(status)}>{getPrescriptionStatusText(status)}</Tag>;
                            },
                        },
                        {
                            title: 'Nama Pasien',
                            dataIndex: 'patient_name',
                        },
                        {
                            title: 'Nama Dokter',
                            dataIndex: 'doctor_name',
                        },
                        {
                            title: 'Catatan Dokter',
                            dataIndex: 'doctor_note',
                        },

                        {
                            title: 'Nama Apoteker',
                            dataIndex: 'pharmacist_name',
                        },
                        {
                            title: 'Catatan Apoteker',
                            dataIndex: 'pharmacist_note',
                        },
                        {
                            title: 'Aksi',
                            fixed: 'right',
                            render: (record) => {
                                return (
                                    <Space size="middle">
                                        <EyeOutlined
                                            className="!text-blue-500"
                                            onClick={() => router.get(`/pharmacist/prescription/${record.id}/detail`)}
                                        />
                                    </Space>
                                );
                            },
                        },
                    ]}
                    rowKey="id"
                    onSearchChange={handleSearchChange}
                    data={prescriptionsData?.data || []}
                    withQuickPageJumper
                    onSortChange={handleSortChange}
                    sort={paginateRequest.sort}
                    orderBy={paginateRequest.orderBy}
                    total={prescriptionsData?.meta?.total || 0}
                    pageSize={paginateRequest.limit}
                    currentPage={paginateRequest.page}
                    onPageChange={handlePageChange}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </Space>
        </DashboardLayout>
    );
};

export default PharmacistPrescriptionPage;
