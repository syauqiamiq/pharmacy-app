import GeneralLogModal from '@/lib/components/atoms/log/GeneralLogModal';
import { handleApiErrorMessage } from '@/lib/functions/api-error-handler.function';
import { getPrescriptionStatusColor, getPrescriptionStatusText } from '@/lib/functions/prescription-helper.function';
import { useDialog } from '@/lib/hooks/useDialog';
import { IGeneralLogResponse } from '@/lib/interfaces/services/log.interface';
import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { useGetPrescriptionById, useUpdatePrescription } from '@/lib/services/prescription.service';
import { App, Button, Card, Skeleton, Space, Tag } from 'antd';
import InvoicePrescriptionModal from './components/InvoicePrescriptionModal';
import ReviewPrescriptionModal from './components/ReviewPrescriptionModal';

interface IPharmacistPrescriptionDetailPageProps {
    prescriptionId: string;
}

const PharmacistPrescriptionDetailPage = (props: IPharmacistPrescriptionDetailPageProps) => {
    const { data: prescriptionData, isLoading } = useGetPrescriptionById(props.prescriptionId as string);
    const updatePrescription = useUpdatePrescription();

    const {
        handleClose: reviewPrescriptionHandleClose,
        open: reviewPrescriptionOpen,
        setDialogState: setReviewPrescriptionDialogState,
        data: reviewPrescriptionDialogData,
    } = useDialog();

    const {
        handleClose: invoicePrescriptionHandleClose,
        open: invoicePrescriptionOpen,
        setDialogState: setInvoicePrescriptionDialogState,
        data: invoicePrescriptionDialogData,
    } = useDialog();
    const {
        handleClose: logPrescriptionHandleClose,
        open: logPrescriptionOpen,
        setDialogState: setLogPrescriptionDialogState,
        data: logPrescriptionDialogData,
    } = useDialog();

    const { message } = App.useApp();
    return (
        <>
            <DashboardLayout
                title="Resep Obat - Detail"
                breadcrumbItems={[{ title: 'Apoteker' }, { title: 'Resep Obat', href: '/pharmacist/prescription' }, { title: 'Detail' }]}
            >
                <Skeleton loading={isLoading} active>
                    {isLoading === false && prescriptionData && (
                        <Space direction="vertical" size="middle" className="w-full">
                            <div className="flex w-full gap-3 lg:justify-end">
                                <Button
                                    type="dashed"
                                    className="w-full lg:w-auto"
                                    onClick={async () =>
                                        setLogPrescriptionDialogState({
                                            open: true,
                                            data: prescriptionData.data.prescription_logs,
                                        })
                                    }
                                >
                                    Log
                                </Button>
                                {['VALIDATED', 'DISPENSING', 'DISPENSED', 'DONE'].includes(prescriptionData?.data?.status) && (
                                    <Button
                                        type="dashed"
                                        className="w-full lg:w-auto"
                                        onClick={async () =>
                                            setInvoicePrescriptionDialogState({
                                                open: true,
                                                data: { id: prescriptionData.data.prescription_invoice?.id },
                                            })
                                        }
                                    >
                                        Invoice
                                    </Button>
                                )}
                                {['PENDING_VALIDATION', 'ON_HOLD'].includes(prescriptionData?.data?.status) && (
                                    <>
                                        <Button
                                            type="primary"
                                            className="w-full lg:w-auto"
                                            onClick={() => setReviewPrescriptionDialogState({ open: true, data: { id: prescriptionData.data.id } })}
                                        >
                                            Validasi Resep
                                        </Button>
                                    </>
                                )}
                                {prescriptionData?.data?.status === 'VALIDATED' && (
                                    <Button
                                        type="primary"
                                        className="w-full !bg-orange-500 lg:w-auto"
                                        onClick={async () => {
                                            await updatePrescription
                                                .mutateAsync({
                                                    prescription_id: prescriptionData.data.id,
                                                    status: 'DISPENSING',
                                                })
                                                .then(() => {
                                                    message.success('Resep berhasil diproses');
                                                })
                                                .catch((err) => {
                                                    const errorMessage = handleApiErrorMessage(err);
                                                    message.error(errorMessage);
                                                });
                                        }}
                                    >
                                        Proses Obat
                                    </Button>
                                )}

                                {['DISPENSING'].includes(prescriptionData?.data?.status) && (
                                    <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
                                        <Button
                                            type="primary"
                                            className="w-full !bg-green-500 lg:w-auto"
                                            onClick={async () => {
                                                await updatePrescription
                                                    .mutateAsync({
                                                        prescription_id: prescriptionData.data.id,
                                                        status: 'DISPENSED',
                                                    })
                                                    .then(() => {
                                                        message.success('Resep berhasil diserahkan ke pasien');
                                                    })
                                                    .catch((err) => {
                                                        const errorMessage = handleApiErrorMessage(err);
                                                        message.error(errorMessage);
                                                    });
                                            }}
                                        >
                                            Selesaikan Obat
                                        </Button>
                                    </div>
                                )}

                                {['DISPENSED'].includes(prescriptionData?.data?.status) && (
                                    <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
                                        <Button
                                            disabled={prescriptionData?.data?.invoice_status !== 'PAID'}
                                            type="primary"
                                            className="w-full !bg-cyan-500 lg:w-auto"
                                            onClick={async () => {
                                                await updatePrescription
                                                    .mutateAsync({
                                                        prescription_id: prescriptionData.data.id,
                                                        status: 'DONE',
                                                    })
                                                    .then(() => {
                                                        message.success('Resep berhasil diselesaikan');
                                                    })
                                                    .catch((err) => {
                                                        const errorMessage = handleApiErrorMessage(err);
                                                        message.error(errorMessage);
                                                    });
                                            }}
                                        >
                                            Tandai Selesai (DISERAHKAN KE PASIEN)
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Nama Dokter</h3>
                                    <div className="text-md mt-1">{prescriptionData?.data?.doctor_name || '-'}</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Catatan Dokter</h3>
                                    <div className="text-md mt-1">{prescriptionData?.data?.doctor_note || '-'}</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Nama Apoteker</h3>
                                    <div className="text-md mt-1">{prescriptionData?.data?.pharmacist_name || '-'}</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Catatan Apoteker</h3>
                                    <div className="text-md mt-1">{prescriptionData?.data?.pharmacist_note || '-'}</div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Status</h3>
                                    <Tag color={getPrescriptionStatusColor(prescriptionData?.data?.status)}>
                                        {getPrescriptionStatusText(prescriptionData?.data.status)}
                                    </Tag>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Status Invoice</h3>
                                    <Tag
                                        color={
                                            prescriptionData?.data?.invoice_status
                                                ? prescriptionData?.data?.invoice_status === 'PAID'
                                                    ? 'green'
                                                    : prescriptionData?.data?.invoice_status === 'PENDING'
                                                      ? 'cyan'
                                                      : prescriptionData?.data?.invoice_status === 'CANCELED'
                                                        ? 'red'
                                                        : '-'
                                                : 'red'
                                        }
                                    >
                                        {prescriptionData?.data?.invoice_status
                                            ? prescriptionData?.data?.invoice_status === 'PAID'
                                                ? 'Lunas'
                                                : prescriptionData?.data?.invoice_status === 'PENDING'
                                                  ? 'Belum Lunas'
                                                  : prescriptionData?.data?.invoice_status === 'CANCELED'
                                                    ? 'Dibatalkan'
                                                    : '-'
                                            : 'Belum Ada Invoice'}
                                    </Tag>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold">Detail Resep</h3>
                            {prescriptionData?.data?.prescription_details && prescriptionData?.data?.prescription_details.length > 0 ? (
                                prescriptionData?.data?.prescription_details?.map((v, i) => {
                                    return (
                                        <Card key={i} className="grid w-full shadow-sm">
                                            <h3 className="text-lg font-bold">{v.medicine_name}</h3>
                                            <div className="mt-2 grid grid-cols-4 gap-3">
                                                <div>
                                                    <h3 className="text-md font-bold">Dosis</h3>
                                                    <h4 className="text-md font-normal">{v.dosage}</h4>
                                                </div>
                                                <div>
                                                    <h3 className="text-md font-bold">Frekuensi</h3>
                                                    <h4 className="text-md font-normal">{v.frequency}</h4>
                                                </div>
                                                <div>
                                                    <h3 className="text-md font-bold">Durasi</h3>
                                                    <h4 className="text-md font-normal">{v.duration}</h4>
                                                </div>
                                                <div>
                                                    <h3 className="text-md font-bold">Catatan</h3>
                                                    <h4 className="text-md font-normal">{v.note}</h4>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div>Tidak ada detail resep</div>
                            )}
                        </Space>
                    )}
                </Skeleton>
            </DashboardLayout>
            {reviewPrescriptionOpen && (
                <div>
                    <ReviewPrescriptionModal
                        open={reviewPrescriptionOpen}
                        onCancel={reviewPrescriptionHandleClose}
                        data={reviewPrescriptionDialogData}
                    />
                </div>
            )}
            {invoicePrescriptionOpen && (
                <div>
                    <InvoicePrescriptionModal
                        open={invoicePrescriptionOpen}
                        onCancel={invoicePrescriptionHandleClose}
                        data={invoicePrescriptionDialogData}
                    />
                </div>
            )}
            {logPrescriptionOpen && (
                <div>
                    <GeneralLogModal
                        title="Log Resep Obat"
                        open={logPrescriptionOpen}
                        onCancel={logPrescriptionHandleClose}
                        data={logPrescriptionDialogData as IGeneralLogResponse[]}
                    />
                </div>
            )}
        </>
    );
};

export default PharmacistPrescriptionDetailPage;
