import { DatePicker } from '@/lib/components/atoms/date-picker';
import { FormSelectInput } from '@/lib/components/atoms/input';

import { onInfiniteScroll } from '@/lib/functions/infinite-scroll-helper';
import { optionsWithDefaultValue } from '@/lib/functions/object-helper.function';
import { useTableAsync } from '@/lib/hooks/useTableAsync';
import { useInfiniteGetAllDoctor } from '@/lib/services/doctor.service';
import { useInfiniteGetAllPatient } from '@/lib/services/patient.service';
import { useGetVisitByID, useUpdateVisit } from '@/lib/services/visit.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Space, Spin } from 'antd';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from '../constants/formSchema';

interface IEditVisitModalProps {
    open: boolean;
    onCancel: () => void;
    data: any;
}

const defaultValues = {
    visit_date: '',
    doctor_id: '',
    patient_id: '',
};

const EditVisitModal = ({ open, onCancel, data }: IEditVisitModalProps) => {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(formSchema),
        mode: 'onSubmit',
    });

    const { handleSubmit, setValue } = methods;

    const { data: visitData, isLoading } = useGetVisitByID(data?.id);

    const { handleSearchChange: handleSearchDoctor, paginateRequest: paginateRequestDoctor } = useTableAsync({});
    const { handleSearchChange: handleSearchPatient, paginateRequest: paginateRequestPatient } = useTableAsync({});

    const {
        data: doctorsData,
        isLoading: isLoadingDoctors,
        fetchNextPage: doctorsFetchNextPage,
        hasNextPage: doctorsHasNextPage,
        isFetchingNextPage: doctorsIsFetchingNextPage,
    } = useInfiniteGetAllDoctor(paginateRequestDoctor);
    const {
        data: patientsData,
        isLoading: isLoadingPatients,
        fetchNextPage: patientsFetchNextPage,
        hasNextPage: patientsHasNextPage,
        isFetchingNextPage: patientsIsFetchingNextPage,
    } = useInfiniteGetAllPatient(paginateRequestPatient);

    useEffect(() => {
        if (isLoading === false && visitData) {
            // Format date for datetime-local input (remove timezone)
            setValue('visit_date', visitData?.data?.visit_date || '');
            setValue('doctor_id', visitData?.data?.doctor_id || '');
            setValue('patient_id', visitData?.data?.patient_id || '');
        }
    }, [isLoading, visitData, setValue]);

    const updateVisit = useUpdateVisit();

    const onSubmit = async (formData: any) => {
        await updateVisit.mutateAsync({
            visit_id: data.id,
            visit_date: formData.visit_date,
            doctor_id: formData.doctor_id,
            patient_id: formData.patient_id,
        });
        onCancel();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal
                    centered
                    title="Edit Kunjungan"
                    open={open}
                    onCancel={onCancel}
                    okText={'Update Kunjungan'}
                    onOk={handleSubmit(onSubmit)}
                    confirmLoading={updateVisit.isPending}
                >
                    <Space direction="vertical" size="middle" className="w-full">
                        <DatePicker fullWidth name="visit_date" showTime label="Jadwal" />

                        <FormSelectInput
                            name="doctor_id"
                            label="Nama Dokter"
                            showSearch
                            placeholder="Pilih Dokter"
                            allowClear
                            loading={isLoadingDoctors || doctorsIsFetchingNextPage}
                            value={{ label: visitData?.data?.doctor?.name, value: visitData?.data?.doctor?.id }}
                            onPopupScroll={(e) =>
                                onInfiniteScroll({
                                    event: e,
                                    hasNextPage: doctorsHasNextPage,
                                    fetchNextPage: doctorsFetchNextPage,
                                })
                            }
                            onSearch={handleSearchDoctor}
                            notFoundContent={isLoadingDoctors && <Spin size="small" />}
                            options={
                                optionsWithDefaultValue(
                                    [
                                        {
                                            id: visitData?.data?.doctor?.id,
                                            name: visitData?.data?.doctor?.name,
                                        },
                                    ],
                                    doctorsData,
                                ) || []
                            }
                        />
                        <FormSelectInput
                            name="patient_id"
                            label="Nama Pasien"
                            showSearch
                            placeholder="Pilih Pasien"
                            allowClear
                            loading={isLoadingPatients || patientsIsFetchingNextPage}
                            value={{ label: visitData?.data?.patient?.name, value: visitData?.data?.patient?.id }}
                            onPopupScroll={(e) =>
                                onInfiniteScroll({
                                    event: e,
                                    hasNextPage: patientsHasNextPage,
                                    fetchNextPage: patientsFetchNextPage,
                                })
                            }
                            onSearch={handleSearchPatient}
                            notFoundContent={isLoadingPatients && <Spin size="small" />}
                            options={
                                optionsWithDefaultValue(
                                    [
                                        {
                                            id: visitData?.data?.patient?.id,
                                            name: visitData?.data?.patient?.name,
                                        },
                                    ],
                                    patientsData,
                                ) || []
                            }
                        />
                    </Space>
                </Modal>
            </form>
        </FormProvider>
    );
};

export default EditVisitModal;
