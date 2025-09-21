import { FormInput } from '@/lib/components/atoms/input';
import { handleApiErrorMessage } from '@/lib/functions/api-error-handler.function';
import { useCreatePatient } from '@/lib/services/patient.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { App, Modal, Space } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from '../constants/formSchema';

interface ICreatePrescriptionModalProps {
    open: boolean;
    onCancel: () => void;
}

const defaultValues = {
    name: '',
    medic_record_number: '',
};
const CreatePrescriptionModal = ({ open, onCancel }: ICreatePrescriptionModalProps) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(formSchema),
        mode: 'onSubmit',
    });

    const { handleSubmit } = methods;

    const createPatient = useCreatePatient();

    const { message } = App.useApp();

    const onSubmit = async (data: any) => {
        await createPatient
            .mutateAsync({
                name: data.name,
                medic_record_number: data.medic_record_number,
            })
            .then(() => {
                message.success('Pasien berhasil ditambahkan');
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
                    confirmLoading={createPatient.isPending}
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

export default CreatePrescriptionModal;
