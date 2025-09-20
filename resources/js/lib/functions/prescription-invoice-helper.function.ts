export const getPrescriptionInvoiceStatusText = (status: string) => {
    switch (status) {
        case 'PENDING':
            return 'Belum Lunas';
        case 'PAID':
            return 'Lunas';
        case 'CANCELED':
            return 'Dibatalkan';

        default:
            return 'gray';
    }
};
