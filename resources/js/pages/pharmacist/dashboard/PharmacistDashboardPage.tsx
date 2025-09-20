import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';

const PharmacistDashboardPage = () => {
    const { props } = usePage<any>();

    return (
        <DashboardLayout title="Dashbor Apoteker" breadcrumbItems={[{ title: 'Dashboard' }, { title: 'Pharmacist' }, { title: 'Dashboard' }]}>
            Selamat datang, {props.auth.user.name}!
        </DashboardLayout>
    );
};

export default PharmacistDashboardPage;
