/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardLayout from '@/lib/layouts/DashboardLayout';

import { BaseTable } from '@/lib/components/molecules/table';
import { useTableAsync } from '@/lib/hooks/useTableAsync';
import { useGetVisitByID } from '@/lib/services/visit.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Space, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { prescriptionSchema } from './constants/prescriptionSchema';

const { Title, Text } = Typography;

interface IDoctorVisitDetailPageProps {
    visitId?: string;
}

const defaultValues = {
    doctor_note: '',
    prescriptionDetails: [
        {
            medicine_id: '',
            medicine_name: '',
            dosage: '',
            frequency: '',
            duration: '',
            note: '',
        },
    ],
};

const DoctorVisitDetailPage = (props: IDoctorVisitDetailPageProps) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(prescriptionSchema),
        mode: 'onSubmit',
    });
    const { handleSubmit, reset } = methods;
    const { data, isLoading } = useGetVisitByID(props.visitId as string);

    const { paginateRequest, handlePageChange, handleSearchChange, handleOptionalChange, handleSortChange } = useTableAsync({});

    return (
        <DashboardLayout
            title="Kunjungan Dokter - Pemeriksaan"
            breadcrumbItems={[{ title: 'Dashboard' }, { title: 'Doctor' }, { title: 'Visit' }, { title: 'Anamnesis' }]}
        >
            <Space direction="vertical" size="large" className="mt-6 w-full">
                {/* Data Pasien Section */}
                <Card className="shadow-md">
                    <Title level={3} className="mb-4">
                        Data Pasien
                    </Title>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <Text strong className="text-base">
                                Nama Pasien
                            </Text>
                            <div className="mt-1 text-lg">{data?.data?.patient?.name || '-'}</div>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <Text strong className="text-base">
                                Nomor Rekam Medis
                            </Text>
                            <div className="mt-1 text-lg">{data?.data?.patient?.medic_record_number || '-'}</div>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4">
                            <Text strong className="text-base">
                                Umur
                            </Text>
                            <div className="mt-1 text-lg">25 Tahun</div>
                        </div>
                    </div>
                </Card>

                {/* Anamnesis Section */}
                <Card className="gap-3 shadow-md">
                    <Title level={3} className="mb-4">
                        Anamnesis
                    </Title>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div>
                            <h3 className="text-lg font-semibold">Keluhan Utama</h3>
                            <div className="text-md mt-1">{data?.data?.anamnesis?.patient_complaint || '-'}</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Riwayat Penyakit Sekarang</h3>
                            <div className="text-md mt-1">{data?.data?.anamnesis?.present_illness || '-'}</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Riwayat Sakit Sekarang</h3>
                            <div className="text-md mt-1">{data?.data?.anamnesis?.past_illness || '-'}</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Riwayat Alergi</h3>
                            <div className="text-md mt-1">{data?.data?.anamnesis?.allergy_history || '-'}</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Riwayat Keluarga</h3>
                            <div className="text-md mt-1">{data?.data?.anamnesis?.family_history || '-'}</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Riwayat Pengobatan</h3>
                            <div className="text-md mt-1">{data?.data?.anamnesis?.medication_history || '-'}</div>
                        </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3">
                        <div>
                            <h3 className="text-lg font-semibold">Hasil Pemeriksaan Fisik</h3>
                            <div className="text-md mt-1">{data?.data?.anamnesis?.physical_exam || '-'}</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Catatan Tambahan</h3>
                            <div className="text-md mt-1">{data?.data?.anamnesis?.note || '-'}</div>
                        </div>
                    </div>
                    <div className="mt-3 mb-4 flex items-center justify-between">
                        <Title level={3} className="mb-0">
                            Detail Anamnesis
                        </Title>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                        {data?.data?.anamnesis?.anamnesis_details?.map((v, i) => {
                            return (
                                <Card key={i} className="flex w-full shadow-sm">
                                    <h3 className="text-xl font-bold">{v.key}</h3>
                                    <h4 className="text-lg font-normal">
                                        {v.value} {v.unit}
                                    </h4>
                                </Card>
                            );
                        })}
                    </div>
                </Card>
                {/* Detail Anamnesis Section */}
                <Card className="shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                        <Title level={3} className="mb-0">
                            Resep Obat
                        </Title>
                    </div>

                    <BaseTable
                        actionComponent={
                            <div className="flex w-full lg:justify-end">
                                <Button type="primary" className="w-full lg:w-auto" onClick={() => console.log('Tambah Data')}>
                                    Tambah Resep Obat
                                </Button>
                            </div>
                        }
                        isLoading={false}
                        columns={[
                            {
                                title: 'Name',
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
                        ]}
                        rowKey="id"
                        withSearch
                        onSearchChange={handleSearchChange}
                        data={[]}
                        withQuickPageJumper
                        onSortChange={handleSortChange}
                        sort={paginateRequest.sort}
                        orderBy={paginateRequest.orderBy}
                        total={0}
                        pageSize={paginateRequest.limit}
                        currentPage={paginateRequest.page}
                        onPageChange={handlePageChange}
                        pageSizeOptions={[10, 25, 50, 100]}
                    />
                </Card>
            </Space>
        </DashboardLayout>
    );
};

export default DoctorVisitDetailPage;
