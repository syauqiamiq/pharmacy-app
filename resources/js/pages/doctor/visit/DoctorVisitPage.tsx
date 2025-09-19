import { useTableAsync } from '@/lib/hooks/useTableAsync';
import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { useGetAllMyVisit } from '@/lib/services/visit.service';
import { Badge, DatePicker, Input, Pagination, Space, Spin } from 'antd';
import VisitCard from './components/VisitCard';

const DoctorVisitPage = () => {
    const { paginateRequest, handlePageChange, handleSearchChange, handleOptionalChange } = useTableAsync<{
        fromDate?: string;
        toDate?: string;
    }>();

    const { data, isLoading } = useGetAllMyVisit(paginateRequest);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SCHEDULED':
                return 'blue';
            case 'IN_ROOM':
                return 'orange';
            case 'DONE':
                return 'green';
            case 'CANCELLED':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'SCHEDULED':
                return 'Dijadwalkan';
            case 'IN_ROOM':
                return 'Didalam Ruangan';
            case 'DONE':
                return 'Selesai';
            case 'CANCELLED':
                return 'Dibatalkan';
            default:
                return '-';
        }
    };

    return (
        <DashboardLayout title="Kunjungan Dokter" breadcrumbItems={[{ title: 'Dashboard' }, { title: 'Doctor' }, { title: 'Visit' }]}>
            <Space direction="vertical" size="large" className="mt-4 w-full">
                <div className="mb-6 grid w-full grid-cols-1 gap-3 lg:grid-cols-6">
                    <div>
                        <Input.Search className="w-full" placeholder="Search..." onChange={(e) => handleSearchChange(e.target.value)} allowClear />
                    </div>
                    <div>
                        <DatePicker.RangePicker
                            className="w-full"
                            onChange={(date) => {
                                if (date) {
                                    handleOptionalChange('fromDate', date[0]?.toISOString());
                                    handleOptionalChange('toDate', date[1]?.toISOString());
                                } else {
                                    handleOptionalChange('fromDate', undefined);
                                    handleOptionalChange('toDate', undefined);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {isLoading ? (
                        <div className="flex w-full justify-center">
                            <Spin tip="Loading" size="default" />
                        </div>
                    ) : data && data.data.length > 0 ? (
                        data.data?.map((item, i) => (
                            <div className="w-full" key={i}>
                                <Badge.Ribbon color={getStatusColor(item.status)} text={getStatusText(item.status)}>
                                    <VisitCard
                                        patientName={item.patient?.name || '-'}
                                        medicalRecordNumber={item.patient?.medic_record_number || '-'}
                                        patientId={item.patient_id}
                                        doctorName={item.doctor?.user?.name || '-'}
                                        doctorSpecialization={item.doctor?.specialization || '-'}
                                        visitDate={item.visit_date}
                                        visitId={item.id}
                                    />
                                </Badge.Ribbon>
                            </div>
                        ))
                    ) : (
                        <div>No visits found.</div>
                    )}
                </div>
                <div className="mt-6 flex w-full justify-end">
                    <Pagination
                        responsive
                        showSizeChanger
                        showQuickJumper
                        pageSizeOptions={['6', '15', '20', '25', '100']}
                        current={paginateRequest.page ?? 1}
                        pageSize={paginateRequest.limit ?? 6}
                        total={100}
                        onChange={(page, pageSize) => handlePageChange(page, pageSize)}
                        onShowSizeChange={(_, size) => handlePageChange(1, size)}
                        showTotal={(total, range) => `${range[0]} - ${range[1]} of ${total}`}
                    />
                </div>
            </Space>
        </DashboardLayout>
    );
};

export default DoctorVisitPage;
