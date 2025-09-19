import { IPageProps } from '@/lib/interfaces/page.interface';
import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';

const DoctorDashboardPage = () => {
    const { props } = usePage<IPageProps>();
    console.log(props);
    return (
        <DashboardLayout breadcrumbItems={[{ title: 'Dashboard' }, { title: 'Doctor' }, { title: 'Dashboard' }]}>
            <div className="text-2xl font-bold">Dashboard Page</div>
        </DashboardLayout>
    );
};

export default DoctorDashboardPage;
