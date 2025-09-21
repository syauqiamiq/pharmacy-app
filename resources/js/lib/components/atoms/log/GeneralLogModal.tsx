import { IGeneralLogResponse } from '@/lib/interfaces/services/log.interface';
import { Modal, Timeline } from 'antd';
import { format } from 'date-fns';

interface IGeneralLogModalProps {
    title: string;
    open: boolean;
    onCancel: () => void;
    data?: IGeneralLogResponse[];
    setDialogState?: React.Dispatch<React.SetStateAction<{ open: boolean; data: any }>>;
}

const GeneralLogModal = ({ data, open, onCancel, title }: IGeneralLogModalProps) => {
    console.log('data log:', data);
    return (
        <Modal centered title={title} open={open} onCancel={onCancel} footer={null} width={800}>
            {data && data.length > 0 ? (
                <div className="max-h-[60vh] overflow-y-auto py-4">
                    <Timeline
                        items={data?.map((item) => ({
                            children: `${format(new Date(item.created_at), 'dd MMMM yyyy HH:mm:ss')} - ${item.log_description}`,
                        }))}
                    />
                </div>
            ) : (
                <p className="text-center text-gray-500">No logs available.</p>
            )}
        </Modal>
    );
};

export default GeneralLogModal;
