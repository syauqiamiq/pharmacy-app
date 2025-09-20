import { getPrescriptionStatusColor, getPrescriptionStatusText } from '@/lib/functions/prescription-helper.function';
import { useGetPrescriptionById } from '@/lib/services/prescription.service';
import { Card, Modal, Space, Tag } from 'antd';

interface IDetailPrescriptionModalProps {
    open: boolean;
    onCancel: () => void;
    data?: any;
    setDialogState?: React.Dispatch<React.SetStateAction<{ open: boolean; data: any }>>;
}

const DetailPrescriptionModal = ({ data, open, onCancel }: IDetailPrescriptionModalProps) => {
    const { data: prescriptionData, isLoading } = useGetPrescriptionById(data?.id);
    return (
        <Modal loading={isLoading} centered title="Detail Resep Obat" open={open} onCancel={onCancel} footer={null} width={800}>
            {!isLoading && prescriptionData && (
                <Space direction="vertical" size="middle" className="w-full">
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
        </Modal>
    );
};

export default DetailPrescriptionModal;
