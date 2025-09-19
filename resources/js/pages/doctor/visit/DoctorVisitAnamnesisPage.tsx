/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormInput, FormInputArea } from '@/lib/components/atoms/input';
import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { ICreateAnamnesisPayload, useCreateAnamnesis } from '@/lib/services/anamnesis.service';
import { DeleteOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Grid, Row, Space, Typography, message } from 'antd';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { formSchema } from './constants/formSchema';

const { Title, Text } = Typography;

/**
 * DoctorVisitAnamnesisPage Component
 *
 * This component provides a form for doctors to create anamnesis for patient visits.
 *
 * Usage:
 * <DoctorVisitAnamnesisPage visitId="uuid-of-visit" />
 *
 * Features:
 * - Form validation with Yup schema
 * - React Query mutation for API calls
 * - FormData submission for file upload compatibility
 * - Dynamic anamnesis details array
 * - Loading states and error handling
 * - Form reset after successful submission
 */

interface IDoctorVisitAnamnesisPage {
    visitId?: string; // Pass the visit ID from parent component or route params
}

const defaultValues = {
    patient_complaint: '',
    present_illness: '',
    past_illness: '',
    allergy_history: '',
    family_history: '',
    madication_history: '',
    physical_exam: '',
    note: '',
    anamnesisDetails: [] as Array<{ key: string; value: string; unit: string }>,
};

const DoctorVisitAnamnesisPage = (props: IDoctorVisitAnamnesisPage) => {
    // React Query Mutation
    const createAnamnesisWithMutation = useCreateAnamnesis();

    const methods = useForm({
        defaultValues,
        resolver: yupResolver(formSchema),
        mode: 'onSubmit',
    });
    const { handleSubmit, reset } = methods;
    const { lg, xs } = Grid.useBreakpoint();
    const {
        fields: anamnesisDetailsFields,
        append: appendAnamnesisDetailsFields,
        remove: removeAnamnesisDetailsFields,
    } = useFieldArray<any>({
        name: 'anamnesisDetails',
        control: methods.control,
    });

    // Handle form submission
    const onSubmit = async (data: any) => {
        try {
            // For demo purposes, using a dummy visit ID
            // In real implementation, this should come from props, URL params, or context
            // Example: const visitId = useParams().visitId or props.visitId
            const visitId = props.visitId || 'dummy-visit-id-for-demo';

            if (!props.visitId) {
                message.warning('Visit ID tidak ditemukan. Pastikan halaman diakses dari visit yang valid.');
                return;
            }

            const payload: ICreateAnamnesisPayload = {
                visit_id: visitId,
                patient_complaint: data.patient_complaint,
                present_illness: data.present_illness,
                past_illness: data.past_illness,
                allergy_history: data.allergy_history,
                family_history: data.family_history,
                madication_history: data.madication_history,
                physical_exam: data.physical_exam,
                note: data.note,
                anamnesisDetails: data.anamnesisDetails || [],
            };
            console.log('Form Data:', payload);
            await createAnamnesisWithMutation.mutateAsync(payload);

            message.success('Anamnesis berhasil disimpan!');
            reset(); // Reset form after successful submission
        } catch (error: any) {
            console.error('Error creating anamnesis:', error);
            message.error(error?.response?.data?.message || 'Terjadi kesalahan saat menyimpan anamnesis');
        }
    };

    return (
        <DashboardLayout
            title="Kunjungan Dokter - Pemeriksaan"
            breadcrumbItems={[{ title: 'Dashboard' }, { title: 'Doctor' }, { title: 'Visit' }, { title: 'Anamnesis' }]}
        >
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    <div className="mt-1 text-lg">Muhammad Syauqi Amiq</div>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <Text strong className="text-base">
                                        Nomor Rekam Medis
                                    </Text>
                                    <div className="mt-1 text-lg">123456789</div>
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
                                <FormInputArea
                                    name="patient_complaint"
                                    label="Keluhan Pasien"
                                    className="h-32"
                                    placeholder="Deskripsikan keluhan utama pasien..."
                                />
                                <FormInputArea
                                    name="present_illness"
                                    label="Riwayat Sakit Sekarang"
                                    className="h-32"
                                    placeholder="Riwayat penyakit yang sedang dialami..."
                                />
                                <FormInputArea
                                    name="past_illness"
                                    label="Riwayat Sakit Dahulu"
                                    className="h-32"
                                    placeholder="Riwayat penyakit yang pernah dialami..."
                                />
                                <FormInputArea
                                    name="allergy_history"
                                    label="Riwayat Alergi"
                                    className="h-32"
                                    placeholder="Riwayat alergi makanan, obat, dll..."
                                />
                                <FormInputArea
                                    name="family_history"
                                    label="Riwayat Keluarga"
                                    className="h-32"
                                    placeholder="Riwayat penyakit dalam keluarga..."
                                />
                                <FormInputArea
                                    name="madication_history"
                                    label="Riwayat Pengobatan"
                                    className="h-32"
                                    placeholder="Riwayat pengobatan yang pernah dilakukan..."
                                />
                            </div>
                            <div className="mt-3 grid grid-cols-1 gap-3">
                                <FormInputArea name="physical_exam" label="Pemeriksaan Fisik" placeholder="Hasil pemeriksaan fisik pasien..." />
                                <FormInputArea name="note" label="Catatan" placeholder="Catatan tambahan..." />
                            </div>
                            <div className="mt-3 mb-4 flex items-center justify-between">
                                <Title level={3} className="mb-0">
                                    Detail Anamnesis
                                </Title>
                            </div>

                            {anamnesisDetailsFields.map((field, index) => (
                                <div className="mb-5 grid grid-cols-12 gap-3">
                                    <div className="col-span-12 lg:col-span-3">
                                        <FormInput label="Nama" name={`anamnesisDetails.${index}.key`} placeholder="Nama" />
                                    </div>
                                    <div className="col-span-12 lg:col-span-3">
                                        <FormInput label="Nilai" name={`anamnesisDetails.${index}.value`} placeholder="Nilai" />
                                    </div>
                                    <div className="col-span-12 lg:col-span-3">
                                        <FormInput label="Unit" name={`anamnesisDetails.${index}.unit`} placeholder="Unit" />
                                    </div>
                                    <div className="col-span-12 flex items-end lg:col-span-3">
                                        <Button className={lg ? 'w-23' : 'w-full'} danger onClick={() => removeAnamnesisDetailsFields(index)}>
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button
                                className="mt-4 w-full"
                                type="dashed"
                                onClick={() =>
                                    appendAnamnesisDetailsFields({
                                        key: '',
                                        value: '',
                                        unit: '',
                                    })
                                }
                            >
                                Tambah Data
                            </Button>
                        </Card>
                        {/* Detail Anamnesis Section */}
                        <Card className="shadow-md">
                            <div className="mb-4 flex items-center justify-between">
                                <Title level={3} className="mb-0">
                                    Resep Obat
                                </Title>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <Card className="shadow-md">
                            <Row gutter={[16, 16]} justify="end">
                                <Col>
                                    <Button
                                        size="large"
                                        className="min-w-32"
                                        onClick={() => reset()}
                                        disabled={createAnamnesisWithMutation.isPending}
                                    >
                                        Batal
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="min-w-32 bg-green-500 hover:bg-green-600"
                                        htmlType="submit"
                                        loading={createAnamnesisWithMutation.isPending}
                                    >
                                        Simpan
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Space>
                </form>
            </FormProvider>
        </DashboardLayout>
    );
};

export default DoctorVisitAnamnesisPage;
