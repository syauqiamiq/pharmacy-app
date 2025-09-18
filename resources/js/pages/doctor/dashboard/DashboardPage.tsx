import DashboardLayout from '@/lib/layouts/DashboardLayout';

const DashboardPage = () => {
    return (
        <DashboardLayout breadcrumbItems={[{ title: 'Dashboard' }, { title: 'Doctor' }, { title: 'Dashboard' }]}>
            <div className="text-2xl font-bold">Dashboard Page</div>
        </DashboardLayout>
    );
};

export default DashboardPage;
