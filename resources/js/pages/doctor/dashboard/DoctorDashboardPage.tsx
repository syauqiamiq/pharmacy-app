import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';

const DoctorDashboardPage = () => {
    const { props } = usePage<any>();

    return (
        <DashboardLayout title="Dashbor Dokter" breadcrumbItems={[{ title: 'Dokter' }, { title: 'Dasbor' }]}>
            Selamat datang, {props.auth.user.name}!
        </DashboardLayout>
    );
};

export default DoctorDashboardPage;
