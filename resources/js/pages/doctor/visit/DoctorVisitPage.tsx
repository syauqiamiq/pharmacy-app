import DashboardLayout from '@/lib/layouts/DashboardLayout';

const DoctorVisitPage = () => {
    return (
        <DashboardLayout breadcrumbItems={[{ title: 'Dashboard' }, { title: 'Doctor' }, { title: 'Visit' }]}>
            <div className="text-2xl font-bold">Visit Page</div>
        </DashboardLayout>
    );
};

export default DoctorVisitPage;
