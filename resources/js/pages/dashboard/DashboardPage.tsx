import DashboardLayout from '@/lib/layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';

const Dashboard = () => {
    const { props }: { props: any; url?: string } = usePage();

    return (
        <DashboardLayout title="Dashboard" breadcrumbItems={[{ title: 'Dashboard' }]}>
            <div className="text-2xl font-bold">Welcome back, {props.auth.user.name}!</div>
        </DashboardLayout>
    );
};

export default Dashboard;
