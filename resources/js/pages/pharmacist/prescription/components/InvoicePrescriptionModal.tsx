import { FormSelectInput } from '@/lib/components/atoms/input';
import PrescriptionInvoicePdf from '@/lib/components/molecules/invoice/PrescriptionInvoicePdf';
import { handleApiErrorMessage } from '@/lib/functions/api-error-handler.function';
import { getPrescriptionInvoiceStatusText } from '@/lib/functions/prescription-invoice-helper.function';
import { useGetPrescriptionInvoiceById, useUpdatePrescriptionInvoice } from '@/lib/services/prescription-invoice.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { PDFViewer as ReactPDFViewer } from '@react-pdf/renderer';
import { App, Grid, Modal, Space, Tag } from 'antd';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { prescriptionInvoiceSchema } from '../constants/prescriptionInvoiceSchema';

interface IInvoicePrescriptionModalProps {
    open: boolean;
    onCancel: () => void;
    data?: any;
    setDialogState?: React.Dispatch<React.SetStateAction<{ open: boolean; data: any }>>;
}

const defaultValues = {
    status: '',
};
const InvoicePrescriptionModal = ({ data, open, onCancel }: IInvoicePrescriptionModalProps) => {
    const { lg } = Grid.useBreakpoint();
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(prescriptionInvoiceSchema),
        mode: 'onSubmit',
    });

    const { data: prescriptionInvoiceData, isLoading } = useGetPrescriptionInvoiceById(data?.id);

    const { handleSubmit, setValue, watch } = methods;

    useEffect(() => {
        if (isLoading === false && prescriptionInvoiceData) {
            setValue('status', prescriptionInvoiceData?.data.status);
        }
    }, [isLoading, prescriptionInvoiceData]);

    const updatePrescriptionInvoice = useUpdatePrescriptionInvoice();

    const { message } = App.useApp();
    const onSubmit = async (formData: any) => {
        await updatePrescriptionInvoice
            .mutateAsync({
                prescription_invoice_id: data.id,
                status: formData.status,
            })
            .then(() => {
                message.success('Invoice berhasil diperbarui');
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
                    width={lg ? '60vw' : '100%'}
                    title="Invoice Resep Obat"
                    open={open}
                    loading={isLoading}
                    onCancel={onCancel}
                    okText={'Simpan Perubahan'}
                    onOk={handleSubmit(onSubmit)}
                    footer={prescriptionInvoiceData?.data?.status === 'PAID' ? null : undefined}
                    confirmLoading={updatePrescriptionInvoice.isPending}
                >
                    <Space direction="vertical" size="middle" className="w-full">
                        <div>
                            <h3 className="text-lg font-semibold">Status Invoice</h3>
                            <Tag
                                color={
                                    prescriptionInvoiceData?.data?.status
                                        ? prescriptionInvoiceData?.data?.status === 'PAID'
                                            ? 'green'
                                            : prescriptionInvoiceData?.data?.status === 'PENDING'
                                              ? 'cyan'
                                              : prescriptionInvoiceData?.data?.status === 'CANCELED'
                                                ? 'red'
                                                : '-'
                                        : 'red'
                                }
                            >
                                {prescriptionInvoiceData?.data?.status
                                    ? getPrescriptionInvoiceStatusText(prescriptionInvoiceData?.data?.status)
                                    : 'Belum Ada Invoice'}
                            </Tag>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Diterbitkan Pada</h3>
                            <div className="text-md mt-1">
                                {prescriptionInvoiceData?.data?.issued_at
                                    ? format(prescriptionInvoiceData?.data?.issued_at, 'dd MMMM yyyy, HH:mm:ss')
                                    : '-'}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Dibayar Pada</h3>
                            <div className="text-md mt-1">
                                {prescriptionInvoiceData?.data?.paid_at
                                    ? format(prescriptionInvoiceData?.data?.paid_at, 'dd MMMM yyyy, HH:mm:ss')
                                    : '-'}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Total Harga</h3>
                            <div className="text-md mt-1">{`Rp ${prescriptionInvoiceData?.data?.total_amount.toLocaleString('id-ID')}`}</div>
                        </div>
                        {prescriptionInvoiceData?.data?.status !== 'PAID' ? (
                            <FormSelectInput
                                label="Status"
                                name="status"
                                placeholder="Status"
                                value={{
                                    label: getPrescriptionInvoiceStatusText(watch('status')),
                                    value: watch('status'),
                                }}
                                options={[
                                    {
                                        label: 'Lunas',
                                        value: 'PAID',
                                    },
                                    {
                                        label: 'Belum Lunas',
                                        value: 'PENDING',
                                    },
                                ]}
                            />
                        ) : (
                            <div>
                                <h3 className="text-lg font-semibold">Status Invoice</h3>
                                <Tag
                                    color={
                                        prescriptionInvoiceData?.data?.status
                                            ? prescriptionInvoiceData?.data?.status === 'PAID'
                                                ? 'green'
                                                : prescriptionInvoiceData?.data?.status === 'PENDING'
                                                  ? 'cyan'
                                                  : prescriptionInvoiceData?.data?.status === 'CANCELED'
                                                    ? 'red'
                                                    : '-'
                                            : 'red'
                                    }
                                >
                                    {prescriptionInvoiceData?.data?.status
                                        ? getPrescriptionInvoiceStatusText(prescriptionInvoiceData?.data?.status)
                                        : 'Belum Ada Invoice'}
                                </Tag>{' '}
                            </div>
                        )}

                        <div>
                            <h3 className="text-lg font-semibold">Preview</h3>
                            {prescriptionInvoiceData && prescriptionInvoiceData.data && (
                                <div className="mt-2 flex h-[50vh] w-full justify-center">
                                    <ReactPDFViewer width="100%" height="100%">
                                        <PrescriptionInvoicePdf prescriptionInvoiceData={prescriptionInvoiceData.data} />
                                    </ReactPDFViewer>
                                </div>
                            )}
                        </div>
                    </Space>
                </Modal>
            </form>
        </FormProvider>
    );
};

export default InvoicePrescriptionModal;
