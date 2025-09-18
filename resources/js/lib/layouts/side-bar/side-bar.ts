import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
import { MenuProps } from 'antd';
import React from 'react';

export const sideBar: MenuProps['items'] | undefined = [
    {
        key: `/doctor/dashboard`,
        icon: React.createElement(DashboardOutlined),
        label: `Dasbor`,
        onClick: () => {
            router.get('/doctor/dashboard');
        },
    },
    {
        key: `/doctor/visit`,
        icon: React.createElement(UserOutlined),
        label: `Kunjungan`,
        onClick: () => {
            router.get('/doctor/visit');
        },
    },

    {
        key: `/pharmacist/dashboard`,
        icon: React.createElement(UserOutlined),

        label: `Dasbor`,
        onClick: () => {
            router.get('/pharmacist/dashboard');
        },
    },
    {
        key: `/pharmacist/prescription`,
        icon: React.createElement(UserOutlined),
        label: `Resep Obat`,
        onClick: () => {
            router.get('/pharmacist/prescription');
        },
    },

    {
        key: `/admin/dashboard`,
        icon: React.createElement(UserOutlined),
        label: `Dasbor`,
        onClick: () => {
            router.get('/admin/dashboard');
        },
    },

    {
        key: `/admin/patient`,
        icon: React.createElement(UserOutlined),
        label: `Dasbor`,
        onClick: () => {
            router.get('/admin/patient');
        },
    },

    {
        key: `/admin/visit`,
        icon: React.createElement(UserOutlined),
        label: `Kunjungan Dokter`,
        onClick: () => {
            router.get('/admin/visit');
        },
    },
];
