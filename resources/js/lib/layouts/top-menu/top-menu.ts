import { router } from '@inertiajs/react';
import { MenuProps } from 'antd';

export const topMenu: MenuProps['items'] | undefined = [
    {
        key: '/dashboard',
        label: 'Dashboard',
        onClick: () => {
            router.get('/dashboard');
        },
    },
    {
        key: 'doctor',
        label: 'Doctor',
        title: 'Doctor',
        onClick: () => {
            router.get('/doctor/dashboard');
        },
    },
    {
        key: 'pharmacist',
        label: 'Pharmacist',
    },

    {
        key: 'admin',
        label: 'Admin',
    },
];
