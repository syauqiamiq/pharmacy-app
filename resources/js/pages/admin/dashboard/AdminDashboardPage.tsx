import DashboardLayout from '@/lib/layouts/DashboardLayout';
import {
    BookOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    FileTextOutlined,
    HeartOutlined,
    MedicineBoxOutlined,
    PlusOutlined,
    StarOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { usePage } from '@inertiajs/react';
import { Alert, Badge, Button, Card, Col, Divider, List, Progress, Row, Space, Statistic, Table, Tag, Timeline, Typography } from 'antd';

const { Title, Text } = Typography;

const AdminDashboardPage = () => {
    const { props } = usePage<any>();

    // Dummy data for doctor dashboard
    const doctorStats = {
        todayPatients: 12,
        completedConsultations: 8,
        pendingAnamnesis: 3,
        prescriptionsWritten: 15,
    };

    const todaySchedule = [
        { time: '08:00-09:00', patient: 'Ahmad Rizki', type: 'Konsultasi Umum', status: 'completed' },
        { time: '09:00-10:00', patient: 'Siti Nurhaliza', type: 'Kontrol Rutin', status: 'completed' },
        { time: '10:00-11:00', patient: 'Budi Santoso', type: 'Pemeriksaan Lanjutan', status: 'in-progress' },
        { time: '11:00-12:00', patient: 'Maya Sari', type: 'Konsultasi Umum', status: 'upcoming' },
        { time: '14:00-15:00', patient: 'Andi Pratama', type: 'Kontrol Diabetes', status: 'upcoming' },
    ];

    const recentPatients = [
        {
            id: 'P001',
            name: 'Ahmad Rizki',
            age: 35,
            lastVisit: '2025-09-20',
            condition: 'Hipertensi',
            status: 'stable',
        },
        {
            id: 'P002',
            name: 'Siti Nurhaliza',
            age: 28,
            lastVisit: '2025-09-19',
            condition: 'Diabetes Type 2',
            status: 'needs-followup',
        },
        {
            id: 'P003',
            name: 'Budi Santoso',
            age: 42,
            lastVisit: '2025-09-18',
            condition: 'Asma',
            status: 'stable',
        },
    ];

    const quickActions = [
        { label: 'Buat Kunjungan Baru', color: '#1890ff', icon: <PlusOutlined /> },
        { label: 'Lihat Jadwal Hari Ini', color: '#52c41a', icon: <CalendarOutlined /> },
        { label: 'Tulis Anamnesis', color: '#722ed1', icon: <FileTextOutlined /> },
        { label: 'Review Resep', color: '#fa8c16', icon: <MedicineBoxOutlined /> },
    ];

    const medicalUpdates = [
        {
            title: 'Update Protokol COVID-19',
            description: 'Pedoman terbaru penanganan pasien COVID-19 dari WHO',
            time: '2 jam lalu',
            type: 'protocol',
        },
        {
            title: 'Obat Baru untuk Hipertensi',
            description: 'FDA menyetujui obat antihipertensi generasi baru',
            time: '1 hari lalu',
            type: 'medication',
        },
        {
            title: 'Seminar Kardiologi',
            description: 'Webinar tentang perkembangan terbaru kardiologi interventional',
            time: '2 hari lalu',
            type: 'education',
        },
    ];

    const patientColumns = [
        {
            title: 'ID Pasien',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Umur',
            dataIndex: 'age',
            key: 'age',
            render: (age: number) => `${age} tahun`,
        },
        {
            title: 'Kondisi',
            dataIndex: 'condition',
            key: 'condition',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'stable' ? 'green' : 'orange'}>{status === 'stable' ? 'Stabil' : 'Perlu Follow-up'}</Tag>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            render: () => (
                <Space>
                    <Button type="primary" size="small" icon={<EyeOutlined />}>
                        Lihat
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <DashboardLayout title="Dasbor Dokter" breadcrumbItems={[{ title: 'Dokter' }, { title: 'Dasbor' }]}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Alert
                    message="UI ini dibuat dengan AI dan Dummy Data untuk keperluan mengisi kekosongan UI - Muhammad Syauqi Amiq Amrullah"
                    type="info"
                    showIcon
                />

                {/* Welcome Section */}
                <Alert
                    message={`Selamat datang, Dr. ${props.auth.user.name}!`}
                    description="Semoga hari ini berjalan dengan baik. Mari memberikan pelayanan medis terbaik untuk pasien-pasien kita."
                    type="info"
                    showIcon
                    icon={<HeartOutlined />}
                    style={{ marginBottom: 24 }}
                />

                {/* Doctor Statistics */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Pasien Hari Ini</span>}
                                value={doctorStats.todayPatients}
                                prefix={<UserOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Konsultasi Selesai</span>}
                                value={doctorStats.completedConsultations}
                                prefix={<CheckCircleOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Anamnesis Pending</span>}
                                value={doctorStats.pendingAnamnesis}
                                prefix={<ExclamationCircleOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Resep Ditulis</span>}
                                value={doctorStats.prescriptionsWritten}
                                prefix={<MedicineBoxOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Main Content */}
                <Row gutter={[16, 16]}>
                    {/* Quick Actions */}
                    <Col xs={24} lg={6}>
                        <Card
                            title={
                                <>
                                    <StarOutlined style={{ color: '#faad14' }} /> Aksi Cepat
                                </>
                            }
                            style={{ height: '100%' }}
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                {quickActions.map((action, index) => (
                                    <Button
                                        key={index}
                                        type="default"
                                        size="large"
                                        icon={action.icon}
                                        style={{
                                            width: '100%',
                                            textAlign: 'left',
                                            borderColor: action.color,
                                            color: action.color,
                                        }}
                                    >
                                        {action.label}
                                    </Button>
                                ))}
                            </Space>
                        </Card>
                    </Col>

                    {/* Today Schedule */}
                    <Col xs={24} lg={12}>
                        <Card
                            title={
                                <>
                                    <CalendarOutlined style={{ color: '#52c41a' }} /> Jadwal Hari Ini
                                </>
                            }
                            style={{ height: '100%' }}
                        >
                            <Timeline
                                items={todaySchedule.map((schedule) => ({
                                    color: schedule.status === 'completed' ? 'green' : schedule.status === 'in-progress' ? 'blue' : 'gray',
                                    children: (
                                        <div>
                                            <Text strong>{schedule.time}</Text>
                                            <br />
                                            <Text>{schedule.patient}</Text>
                                            <br />
                                            <Text type="secondary">{schedule.type}</Text>
                                            <br />
                                            <Tag
                                                color={
                                                    schedule.status === 'completed'
                                                        ? 'success'
                                                        : schedule.status === 'in-progress'
                                                          ? 'processing'
                                                          : 'default'
                                                }
                                                style={{ marginTop: 4 }}
                                            >
                                                {schedule.status === 'completed'
                                                    ? 'Selesai'
                                                    : schedule.status === 'in-progress'
                                                      ? 'Sedang Berlangsung'
                                                      : 'Akan Datang'}
                                            </Tag>
                                        </div>
                                    ),
                                }))}
                            />
                        </Card>
                    </Col>

                    {/* Medical Updates */}
                    <Col xs={24} lg={6}>
                        <Card
                            title={
                                <>
                                    <BookOutlined style={{ color: '#722ed1' }} /> Update Medis
                                </>
                            }
                            style={{ height: '100%' }}
                        >
                            <List
                                dataSource={medicalUpdates}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Badge color={item.type === 'protocol' ? 'red' : item.type === 'medication' ? 'blue' : 'green'} />
                                            }
                                            title={
                                                <Text strong style={{ fontSize: '12px' }}>
                                                    {item.title}
                                                </Text>
                                            }
                                            description={
                                                <>
                                                    <Text style={{ fontSize: '11px' }}>{item.description}</Text>
                                                    <br />
                                                    <Text type="secondary" style={{ fontSize: '10px' }}>
                                                        {item.time}
                                                    </Text>
                                                </>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Recent Patients Table */}
                <Card
                    title={
                        <>
                            <TeamOutlined style={{ color: '#13c2c2' }} /> Pasien Terbaru
                        </>
                    }
                >
                    <Table scroll={{ x: 800 }} dataSource={recentPatients} columns={patientColumns} rowKey="id" pagination={false} size="small" />
                </Card>

                {/* Performance Metrics */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={8}>
                        <Card title="📊 Performa Minggu Ini">
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Statistic
                                        title="Tingkat Kepuasan Pasien"
                                        value={94.5}
                                        precision={1}
                                        suffix="%"
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                    <Progress percent={94.5} strokeColor="#52c41a" size="small" />
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Statistic title="Rata-rata Waktu Konsultasi" value={18} suffix="menit" valueStyle={{ color: '#1890ff' }} />
                                    <Progress percent={75} strokeColor="#1890ff" size="small" />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card title="🎯 Target Bulanan">
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Statistic title="Pasien Ditangani" value={156} suffix="/ 200" valueStyle={{ color: '#722ed1' }} />
                                    <Progress percent={78} strokeColor="#722ed1" size="small" />
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Statistic title="Jam Praktik" value={132} suffix="/ 160 jam" valueStyle={{ color: '#fa541c' }} />
                                    <Progress percent={82.5} strokeColor="#fa541c" size="small" />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card title="🏆 Pencapaian">
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <div
                                    style={{
                                        background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
                                        padding: '16px',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Title level={4} style={{ color: '#e17055', margin: 0 }}>
                                        🥇 Dokter Terpopuler
                                    </Title>
                                    <Text style={{ color: '#e17055' }}>Bulan September 2025</Text>
                                </div>
                                <div
                                    style={{
                                        background: 'linear-gradient(135deg, #a8e6cf 0%, #88d8c0 100%)',
                                        padding: '16px',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Title level={4} style={{ color: '#00b894', margin: 0 }}>
                                        ⭐ Rating 4.9/5
                                    </Title>
                                    <Text style={{ color: '#00b894' }}>Dari 156 ulasan</Text>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Space>
        </DashboardLayout>
    );
};

export default AdminDashboardPage;
