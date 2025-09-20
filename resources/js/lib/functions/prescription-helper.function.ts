export const getPrescriptionStatusColor = (status: string) => {
    switch (status) {
        case 'DRAFT':
            return 'gray';
        case 'PENDING_VALIDATION':
            return 'blue';
        case 'VALIDATED':
            return 'orange';
        case 'ON_HOLD':
            return 'gray';
        case 'DISPENSING':
            return 'orange';
        case 'DISPENSED':
            return 'green';
        case 'DONE':
            return 'green';
        case 'REJECTED':
            return 'red';
        case 'CANCELED':
            return 'red';
        case 'RETURN':
            return 'purple';
        case 'EXPIRED':
            return 'cyan';

        default:
            return 'gray';
    }
};

export const getPrescriptionStatusText = (status: string) => {
    switch (status) {
        case 'DRAFT':
            return 'Draft';
        case 'PENDING_VALIDATION':
            return 'Menunggu Validasi';
        case 'VALIDATED':
            return 'Tervalidasi';
        case 'ON_HOLD':
            return 'Ditunda';
        case 'DISPENSING':
            return 'Sedang Dibuat';
        case 'DISPENSED':
            return 'Siap Diambil';
        case 'DONE':
            return 'Selesai';
        case 'REJECTED':
            return 'Ditolak';
        case 'CANCELED':
            return 'Dibatalkan';
        case 'RETURN':
            return 'Dikembalikan';
        case 'EXPIRED':
            return 'Kedaluwarsa';

        default:
            return 'gray';
    }
};
