import { FormInput, FormInputArea, FormSelectInput } from '@/lib/components/atoms/input';
import { useGetAllMedicine } from '@/lib/services/medicine.service';
import { useGetPrescriptionById, useUpdatePrescription } from '@/lib/services/prescription.service';
import { DeleteOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, Space } from 'antd';
import { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { prescriptionSchema } from '../constants/prescriptionSchema';

interface IEditPrescriptionModalProps {
    open: boolean;
    onCancel: () => void;
    data?: any;
    setDialogState?: React.Dispatch<React.SetStateAction<{ open: boolean; data: any }>>;
}

const defaultValues = {
    doctor_name: '',
    doctor_note: '',
    prescriptionDetails: [],
};
const EditPrescriptionModal = ({ data, open, onCancel }: IEditPrescriptionModalProps) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(prescriptionSchema),
        mode: 'onSubmit',
    });

    const { data: prescriptionData, isLoading } = useGetPrescriptionById(data?.id);

    const { handleSubmit, setValue, control } = methods;

    const {
        fields: prescriptionDetailsFields,
        append: appendPrescriptionDetailsFields,
        remove: removePrescriptionDetailsFields,
    } = useFieldArray<any>({
        name: 'prescriptionDetails',
        control,
    });

    useEffect(() => {
        if (isLoading === false && prescriptionData) {
            setValue('doctor_name', prescriptionData?.data?.doctor_name);
            setValue('doctor_note', prescriptionData?.data?.doctor_note);
            setValue(
                'prescriptionDetails',
                (prescriptionData?.data?.prescription_details ?? []).map((v) => {
                    return {
                        medicine_id: v.medicine_id ?? '',
                        medicine_name: v.medicine_name ?? '',
                        dosage: v.dosage ?? '',
                        frequency: v.frequency ?? '',
                        duration: v.duration ?? '',
                        note: v.note ?? '',
                    };
                }),
            );
        }
    }, [isLoading, prescriptionData]);

    const { data: medicines } = useGetAllMedicine();

    const updatePrescription = useUpdatePrescription();

    const onSubmit = async (formData: any) => {
        console.log(formData);
        await updatePrescription.mutateAsync({
            prescription_id: data.id,
            doctor_note: formData.doctor_note,
            prescription_details: formData.prescriptionDetails,
        });
        onCancel();
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal
                    centered
                    title="Edit Resep Obat"
                    open={open}
                    onCancel={onCancel}
                    okText={'Simpan Perubahan'}
                    onOk={handleSubmit(onSubmit)}
                    confirmLoading={false}
                >
                    <Space direction="vertical" size="middle" className="w-full">
                        <FormInput name="doctor_name" label="Nama Dokter" disabled={prescriptionData?.data?.doctor_name !== undefined} />
                        <FormInputArea name="doctor_note" label="Catatan Dokter" placeholder="Masukkan catatan" />
                        <h3 className="text-lg font-semibold">Detail Resep</h3>
                        {prescriptionDetailsFields.map((field: any, index) => (
                            <>
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="lg:col-spa-6 col-span-12">
                                        <FormSelectInput
                                            label="Nama Obat"
                                            name={`prescriptionDetails.${index}.medicine_id`}
                                            placeholder="Nama Obat"
                                            onChange={(value) => {
                                                const selectedMedicine = medicines?.data.find((medicine) => medicine.id === value);
                                                if (selectedMedicine) {
                                                    setValue(`prescriptionDetails.${index}.medicine_name`, selectedMedicine.name || '');
                                                    setValue(`prescriptionDetails.${index}.medicine_id`, selectedMedicine.id || '');
                                                }
                                            }}
                                            defaultValue={{
                                                label: field.medicine_name || 'Pilih Obat',
                                                value: field.medicine_id || '',
                                            }}
                                            options={
                                                medicines?.data.map((medicine) => ({
                                                    label: `${medicine.name} Rp.(${medicine.last_price})`,
                                                    value: medicine.id,
                                                })) || []
                                            }
                                        />
                                    </div>
                                    <div className="lg:col-spa-6 col-span-12">
                                        <FormInput label="Dosis" name={`prescriptionDetails.${index}.dosage`} placeholder="Dosis" />
                                    </div>
                                    <div className="lg:col-spa-6 col-span-6">
                                        <FormInput label="Frekuensi" name={`prescriptionDetails.${index}.frequency`} placeholder="Frekuensi" />
                                    </div>
                                    <div className="lg:col-spa-6 col-span-6">
                                        <FormInput label="Durasi" name={`prescriptionDetails.${index}.duration`} placeholder="Durasi" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-12 lg:col-span-12">
                                        <FormInput label="Catatan" name={`prescriptionDetails.${index}.note`} placeholder="Catatan" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="col-span-12 lg:col-span-12">
                                        <Button className={'w-full'} danger onClick={() => removePrescriptionDetailsFields(index)}>
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ))}
                        <Button
                            className="mt-4 w-full"
                            type="dashed"
                            onClick={() =>
                                appendPrescriptionDetailsFields({
                                    medicine_id: '',
                                    medicine_name: '',
                                    dosage: '',
                                    frequency: '',
                                    duration: '',
                                    note: '',
                                })
                            }
                        >
                            Tambah Obat
                        </Button>
                    </Space>
                </Modal>
            </form>
        </FormProvider>
    );
};

export default EditPrescriptionModal;
