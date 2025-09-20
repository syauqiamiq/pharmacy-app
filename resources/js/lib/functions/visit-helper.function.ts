export const getVisitStatusText = (status: string) => {
    switch (status) {
        case 'SCHEDULED':
            return 'Dijadwalkan';
        case 'IN_ROOM':
            return 'Sedang Berlangsung';
        case 'DONE':
            return 'Selesai';
        case 'CANCELED':
            return 'Dibatalkan';

        default:
            return 'gray';
    }
};

export const getVisitStatusColor = (status: string) => {
    switch (status) {
        case 'SCHEDULED':
            return 'blue';
        case 'IN_ROOM':
            return 'orange';
        case 'DONE':
            return 'green';
        case 'CANCELED':
            return 'red';
        default:
            return 'gray';
    }
};
