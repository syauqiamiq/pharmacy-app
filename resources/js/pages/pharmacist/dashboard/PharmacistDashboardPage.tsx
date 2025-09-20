import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';

const PharmacistDashboardPage = () => {
    const { props } = usePage<any>();

    return (
        <DashboardLayout title="Dashbor Apoteker" breadcrumbItems={[{ title: 'Apoteker' }, { title: 'Dasbor' }]}>
            Selamat datang, {props.auth.user.name}!
        </DashboardLayout>
    );
};

export default PharmacistDashboardPage;
