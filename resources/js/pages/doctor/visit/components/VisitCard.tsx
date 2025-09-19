import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
import { Card, Typography } from 'antd';
import { format } from 'date-fns';
const { Text } = Typography;

interface IVisitCardProps {
    patientName: string;
    medicalRecordNumber?: string;
    patientId?: string;
    doctorName: string;
    doctorSpecialization?: string;
    visitDate?: string;
    visitId?: string;
}

const VisitCard = ({ patientName, medicalRecordNumber, doctorName, doctorSpecialization, visitId }: IVisitCardProps) => {
    return (
        <Card
            hoverable
            onClick={() => router.get(`/doctor/visit/${visitId}/anamnesis`)}
            className="border-gray-200 transition-all duration-200 hover:shadow-lg"
        >
            <div className="flex flex-col">
                {/* Header with Avatar and Basic Info */}
                <div className="mb-4 flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                            <Text strong className="truncate text-lg">
                                {patientName || 'Unknown Patient'}
                            </Text>
                        </div>

                        <div className="mb-2 flex items-center gap-1 text-gray-600">
                            <Text type="secondary" className="truncate text-sm">
                                {`${medicalRecordNumber || 'Unknown'}`}
                            </Text>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <UserOutlined className="flex-shrink-0 text-blue-500" />
                        <div className="min-w-0 flex-1">
                            <Text strong className="block truncate text-sm">
                                {doctorName || 'Unknown Doctor'}
                            </Text>
                            <Text type="secondary" className="text-xs">
                                {doctorSpecialization || 'Unknown Specialization'}
                            </Text>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarOutlined className="flex-shrink-0 text-green-500" />
                        <div className="min-w-0 flex-1">
                            <Text type="secondary" className="block text-xs">
                                Jadwal
                            </Text>
                            <Text className="text-sm">{format(new Date(), 'dd MMMM yyyy, HH:mm')}</Text>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
export default VisitCard;
