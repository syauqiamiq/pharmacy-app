import { DatePicker } from '@/lib/components/atoms/date-picker';
import { FormSelectInput } from '@/lib/components/atoms/input';
import { useTableAsync } from '@/lib/hooks/useTableAsync';
import { useGetAllDoctor } from '@/lib/services/doctor.service';
import { useGetAllPatient } from '@/lib/services/patient.service';
import { useCreateVisit } from '@/lib/services/visit.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Space, Spin } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from '../constants/formSchema';

interface ICreateVisitModalProps {
    open: boolean;
    onCancel: () => void;
}

const defaultValues = {
    visit_date: '',
    doctor_id: '',
    patient_id: '',
};

const CreateVisitModal = ({ open, onCancel }: ICreateVisitModalProps) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(formSchema),
        mode: 'onSubmit',
    });

    const { handleSubmit } = methods;
    const { handleSearchChange: handleSearchDoctor, paginateRequest: paginateRequestDoctor } = useTableAsync({});
    const { handleSearchChange: handleSearchPatient, paginateRequest: paginateRequestPatient } = useTableAsync({});

    const { data: doctorsData, isLoading: isLoadingDoctors } = useGetAllDoctor(paginateRequestDoctor);
    const { data: patientsData, isLoading: isLoadingPatients } = useGetAllPatient(paginateRequestPatient);

    const createVisit = useCreateVisit();

    const onSubmit = async (data: any) => {
        await createVisit.mutateAsync({
            visit_date: data.visit_date,
            doctor_id: data.doctor_id,
            patient_id: data.patient_id,
        });
        onCancel();
    };

    const doctorOptions =
        doctorsData?.data?.map((doctor) => ({
            value: doctor.id,
            label: `${doctor.name} - ${doctor.specialization}`,
        })) || [];

    const patientOptions =
        patientsData?.data?.map((patient) => ({
            value: patient.id,
            label: `${patient.name} - ${patient.medic_record_number}`,
        })) || [];

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal
                    centered
                    title="Buat Kunjungan"
                    open={open}
                    onCancel={onCancel}
                    okText={'Buat Kunjungan'}
                    onOk={handleSubmit(onSubmit)}
                    confirmLoading={createVisit.isPending}
                >
                    <Space direction="vertical" size="middle" className="w-full">
                        <DatePicker fullWidth name="visit_date" showTime label="Jadwal" />
                        <FormSelectInput
                            showSearch
                            allowClear
                            loading={isLoadingDoctors}
                            filterOption={false}
                            onSearch={handleSearchDoctor}
                            notFoundContent={isLoadingDoctors && <Spin size="small" />}
                            name="doctor_id"
                            label="Dokter"
                            placeholder="Pilih Dokter"
                            options={doctorOptions}
                        />
                        <FormSelectInput
                            showSearch
                            allowClear
                            loading={isLoadingPatients}
                            filterOption={false}
                            onSearch={handleSearchPatient}
                            notFoundContent={isLoadingPatients && <Spin size="small" />}
                            name="patient_id"
                            label="Pasien"
                            placeholder="Pilih Pasien"
                            options={patientOptions}
                        />
                    </Space>
                </Modal>
            </form>
        </FormProvider>
    );
};

export default CreateVisitModal;
