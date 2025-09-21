import { FormInput } from '@/lib/components/atoms/input';
import { handleApiErrorMessage } from '@/lib/functions/api-error-handler.function';
import { useGetPatientById, useUpdatePatient } from '@/lib/services/patient.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { App, Modal, Space } from 'antd';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from '../constants/formSchema';

interface IEditPatientModalProps {
    open: boolean;
    onCancel: () => void;
    data: any;
}

const defaultValues = {
    name: '',
    medic_record_number: '',
};
const EditPatientModal = ({ open, onCancel, data }: IEditPatientModalProps) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(formSchema),
        mode: 'onSubmit',
    });

    const { data: patientData, isLoading } = useGetPatientById(data?.id);

    const { handleSubmit, setValue } = methods;

    useEffect(() => {
        if (isLoading === false && patientData) {
            setValue('name', patientData?.data?.name || '');
            setValue('medic_record_number', patientData?.data?.medic_record_number || '');
        }
    }, [isLoading, patientData]);

    const updatePatient = useUpdatePatient();

    const { message } = App.useApp();
    const onSubmit = async (formData: any) => {
        await updatePatient
            .mutateAsync({
                patient_id: data.id,
                name: formData.name,
                medic_record_number: formData.medic_record_number,
            })
            .then(() => {
                message.success('Pasien berhasil diperbarui');
            })
            .catch((err) => {
                const errorMessage = handleApiErrorMessage(err);
                message.error(errorMessage);
            });
        onCancel();
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal
                    centered
                    title="Buat Pasien"
                    open={open}
                    onCancel={onCancel}
                    okText={'Buat Resep'}
                    onOk={handleSubmit(onSubmit)}
                    confirmLoading={updatePatient.isPending}
                >
                    <Space direction="vertical" size="middle" className="w-full">
                        <FormInput name="name" label="Nama Pasien" />
                        <FormInput name="medic_record_number" label="Nomor Rekam Medis" />
                    </Space>
                </Modal>
            </form>
        </FormProvider>
    );
};

export default EditPatientModal;
