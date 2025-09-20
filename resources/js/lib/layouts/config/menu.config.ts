import { TUserRole } from '@/lib/types/user-role.types';
import { CalendarOutlined, DashboardOutlined, MedicineBoxOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import type { MenuConfig } from '../types/menu.types';

// Extend Window interface for Inertia global
declare global {
    interface Window {
        page?: {
            props: {
                auth?: {
                    user?: {
                        roles?: string[];
                        [key: string]: any;
                    };
                };
                [key: string]: any;
            };
        };
    }
}

/**
 * Menu configuration for the pharmacy application
 * This configuration defines all available menu items and their access permissions
 */
export const menuConfig: MenuConfig = {
    topMenu: [
        {
            key: 'dashboard',
            label: 'Dashboard',
            route: '/dashboard',
            roles: ['ADMIN', 'DOCTOR', 'PHARMACIST'],
        },
        {
            key: 'doctor',
            label: 'Doctor',
            route: '/doctor/dashboard',
            roles: ['DOCTOR', 'ADMIN'],
        },
        {
            key: 'pharmacist',
            label: 'Pharmacist',
            route: '/pharmacist/dashboard',
            roles: ['PHARMACIST', 'ADMIN'],
        },
        {
            key: 'admin',
            label: 'Admin',
            route: '/admin/dashboard',
            roles: ['ADMIN'],
        },
    ],
    sideMenu: [
        // Doctor section
        {
            key: '/doctor/dashboard',
            label: 'Dasbor',
            icon: React.createElement(DashboardOutlined),
            route: '/doctor/dashboard',
            roles: ['DOCTOR', 'ADMIN'],
            parentKey: 'doctor',
        },
        {
            key: '/doctor/visit',
            label: 'Kunjungan',
            icon: React.createElement(CalendarOutlined),
            route: '/doctor/visit',
            roles: ['DOCTOR', 'ADMIN'],
            parentKey: 'doctor',
        },

        // Pharmacist section
        {
            key: '/pharmacist/dashboard',
            label: 'Dasbor',
            icon: React.createElement(DashboardOutlined),
            route: '/pharmacist/dashboard',
            roles: ['PHARMACIST', 'ADMIN'],
            parentKey: 'pharmacist',
        },
        {
            key: '/pharmacist/prescription',
            label: 'Resep Obat',
            icon: React.createElement(MedicineBoxOutlined),
            route: '/pharmacist/prescription',
            roles: ['PHARMACIST', 'ADMIN'],
            parentKey: 'pharmacist',
        },

        // Admin section
        {
            key: '/admin/dashboard',
            label: 'Dasbor',
            icon: React.createElement(DashboardOutlined),
            route: '/admin/dashboard',
            roles: ['ADMIN'],
            parentKey: 'admin',
        },
        {
            key: '/admin/patient',
            label: 'Pasien',
            icon: React.createElement(UserOutlined),
            route: '/admin/patient',
            roles: ['ADMIN'],
            parentKey: 'admin',
        },
        {
            key: '/admin/visit',
            label: 'Kunjungan Dokter',
            icon: React.createElement(CalendarOutlined),
            route: '/admin/visit',
            roles: ['ADMIN'],
            parentKey: 'admin',
        },
        {
            key: '/admin/user',
            label: 'Manajemen User',
            icon: React.createElement(TeamOutlined),
            route: '/admin/user',
            roles: ['ADMIN'],
            parentKey: 'admin',
        },
    ],
};

/**
 * Get user roles from Inertia props
 * This function gets the user roles from the authenticated user data
 */
export const getCurrentUserRoles = (): TUserRole[] => {
    // Try to get roles from window.page.props (Inertia global)
    if (typeof window !== 'undefined' && window.page?.props?.auth?.user?.roles) {
        const roles = window.page.props.auth.user.roles as string[];
        // Map database role names to TypeScript enum values
        return roles.map((role) => {
            switch (role.toUpperCase()) {
                case 'ADMIN':
                    return 'ADMIN';
                case 'DOCTOR':
                    return 'DOCTOR';
                case 'PHARMACIST':
                    return 'PHARMACIST';
                default:
                    return 'DOCTOR'; // fallback
            }
        }) as TUserRole[];
    }

    // Fallback to hardcoded role for development/testing
    return ['DOCTOR'];
};

/**
 * Map database role name to UserRole enum
 */
export const mapDatabaseRoleToUserRole = (dbRole: string): TUserRole => {
    switch (dbRole.toUpperCase()) {
        case 'ADMIN':
            return 'ADMIN';
        case 'DOCTOR':
            return 'DOCTOR';
        case 'PHARMACIST':
            return 'PHARMACIST';
        default:
            return 'DOCTOR'; // fallback
    }
};
