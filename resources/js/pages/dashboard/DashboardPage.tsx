import DashboardLayout from '@/lib/layouts/DashboardLayout';
import {
    BellOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    ExclamationCircleOutlined,
    FileTextOutlined,
    HeartOutlined,
    MedicineBoxOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { usePage } from '@inertiajs/react';
import { Alert, Badge, Button, Card, Carousel, Col, List, Progress, Row, Space, Statistic, Tag, Timeline, Typography } from 'antd';

const { Title, Text } = Typography;

const Dashboard = () => {
    const { props }: { props: any; url?: string } = usePage();

    // Dummy data
    const todayStats = {
        totalPatients: 47,
        completedTreatments: 32,
        pendingPrescriptions: 8,
        activeStaff: 15,
    };

    const recentActivities = [
        { id: 1, time: '08:30', activity: 'Pemeriksaan pasien A001', type: 'consultation', status: 'completed' },
        { id: 2, time: '09:15', activity: 'Resep obat untuk pasien B002', type: 'prescription', status: 'pending' },
        { id: 3, time: '10:00', activity: 'Konsultasi tindak lanjut C003', type: 'consultation', status: 'completed' },
        { id: 4, time: '10:45', activity: 'Verifikasi resep D004', type: 'verification', status: 'in-progress' },
    ];

    const announcements = [
        {
            id: 1,
            title: 'Pelatihan Sistem Baru',
            content: 'Pelatihan penggunaan sistem farmasi baru akan dilaksanakan besok pukul 14:00',
            priority: 'high',
        },
        { id: 2, title: 'Update Protokol COVID-19', content: 'Protokol kesehatan telah diperbarui sesuai standar terbaru', priority: 'medium' },
        { id: 3, title: 'Maintenance Server', content: 'Pemeliharaan server dijadwalkan Minggu malam 22:00-02:00', priority: 'low' },
    ];

    const quickActions = [
        { label: 'Buat Kunjungan Baru', color: '#1890ff', icon: <UserOutlined /> },
        { label: 'Cek Stok Obat', color: '#52c41a', icon: <MedicineBoxOutlined /> },
        { label: 'Jadwal Dokter', color: '#722ed1', icon: <CalendarOutlined /> },
        { label: 'Laporan Harian', color: '#fa8c16', icon: <FileTextOutlined /> },
    ];

    return (
        <DashboardLayout title="Dasbor Umum" breadcrumbItems={[{ title: 'Dashboard' }]}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Alert
                    message="UI ini dibuat dengan AI dan Dummy Data untuk keperluan mengisi kekosongan UI - Muhammad Syauqi Amiq Amrullah"
                    type="info"
                    showIcon
                />
                {/* Welcome Section */}
                <Alert
                    message={`Selamat datang kembali, ${props.auth.user.name}!`}
                    description="Semoga hari ini produktif dan penuh berkah. Mari memberikan pelayanan terbaik untuk pasien."
                    type="success"
                    showIcon
                    style={{ marginBottom: 24 }}
                />

                {/* Statistics Cards */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Total Pasien Hari Ini</span>}
                                value={todayStats.totalPatients}
                                prefix={<UserOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Perawatan Selesai</span>}
                                value={todayStats.completedTreatments}
                                prefix={<CheckCircleOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Resep Pending</span>}
                                value={todayStats.pendingPrescriptions}
                                prefix={<ExclamationCircleOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Staff Aktif</span>}
                                value={todayStats.activeStaff}
                                prefix={<TeamOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Main Content Row */}
                <Row gutter={[16, 16]}>
                    {/* Quick Actions */}
                    <Col xs={24} lg={8}>
                        <Card
                            title={
                                <>
                                    <TrophyOutlined style={{ color: '#faad14' }} /> Aksi Cepat
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

                    {/* Recent Activities */}
                    <Col xs={24} lg={8}>
                        <Card
                            title={
                                <>
                                    <ClockCircleOutlined style={{ color: '#52c41a' }} /> Aktivitas Terkini
                                </>
                            }
                            style={{ height: '100%' }}
                        >
                            <Timeline
                                items={recentActivities.map((activity) => ({
                                    color: activity.status === 'completed' ? 'green' : activity.status === 'pending' ? 'orange' : 'blue',
                                    children: (
                                        <div>
                                            <Text strong>{activity.time}</Text>
                                            <br />
                                            <Text>{activity.activity}</Text>
                                            <br />
                                            <Tag
                                                color={
                                                    activity.status === 'completed'
                                                        ? 'success'
                                                        : activity.status === 'pending'
                                                          ? 'warning'
                                                          : 'processing'
                                                }
                                                style={{ marginTop: 4 }}
                                            >
                                                {activity.status === 'completed' ? 'Selesai' : activity.status === 'pending' ? 'Menunggu' : 'Proses'}
                                            </Tag>
                                        </div>
                                    ),
                                }))}
                            />
                        </Card>
                    </Col>

                    {/* Announcements */}
                    <Col xs={24} lg={8}>
                        <Card
                            title={
                                <>
                                    <BellOutlined style={{ color: '#fa541c' }} /> Pengumuman
                                </>
                            }
                            style={{ height: '100%' }}
                        >
                            <List
                                dataSource={announcements}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Badge color={item.priority === 'high' ? 'red' : item.priority === 'medium' ? 'orange' : 'blue'} />
                                            }
                                            title={<Text strong>{item.title}</Text>}
                                            description={item.content}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Performance & Health Metrics */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                        <Card
                            title={
                                <>
                                    <HeartOutlined style={{ color: '#eb2f96' }} /> Kesehatan Sistem
                                </>
                            }
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic title="Server Uptime" value={99.8} precision={1} suffix="%" />
                                    <Progress percent={99.8} strokeColor="#52c41a" size="small" />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Database Response" value={1.2} precision={1} suffix="ms" />
                                    <Progress percent={85} strokeColor="#1890ff" size="small" />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card
                            title={
                                <>
                                    <DollarOutlined style={{ color: '#13c2c2' }} /> Ringkasan Keuangan
                                </>
                            }
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Pendapatan Hari Ini"
                                        value={12500000}
                                        precision={0}
                                        prefix="Rp "
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Target Bulanan" value={75} precision={0} suffix="%" valueStyle={{ color: '#1890ff' }} />
                                    <Progress percent={75} strokeColor="#722ed1" size="small" />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Tips Carousel */}
                <Card title="💡 Tips & Informasi Kesehatan">
                    <Carousel autoplay>
                        <div>
                            <div
                                style={{
                                    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                                    padding: '40px',
                                    textAlign: 'center',
                                    borderRadius: '8px',
                                }}
                            >
                                <Title level={3} style={{ color: 'white', marginBottom: 0 }}>
                                    💊 Selalu Periksa Tanggal Kadaluarsa Obat
                                </Title>
                                <Text style={{ color: 'white', fontSize: '16px' }}>
                                    Pastikan setiap obat yang diberikan masih dalam kondisi baik dan belum kadaluarsa
                                </Text>
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                    padding: '40px',
                                    textAlign: 'center',
                                    borderRadius: '8px',
                                }}
                            >
                                <Title level={3} style={{ color: '#1890ff', marginBottom: 0 }}>
                                    🩺 Komunikasi yang Baik dengan Pasien
                                </Title>
                                <Text style={{ color: '#1890ff', fontSize: '16px' }}>
                                    Berikan penjelasan yang jelas tentang kondisi dan pengobatan kepada pasien
                                </Text>
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                                    padding: '40px',
                                    textAlign: 'center',
                                    borderRadius: '8px',
                                }}
                            >
                                <Title level={3} style={{ color: '#fa541c', marginBottom: 0 }}>
                                    📝 Dokumentasi yang Lengkap
                                </Title>
                                <Text style={{ color: '#fa541c', fontSize: '16px' }}>
                                    Catat semua tindakan medis dengan detail untuk kontinuitas perawatan
                                </Text>
                            </div>
                        </div>
                    </Carousel>
                </Card>
            </Space>
        </DashboardLayout>
    );
};

export default Dashboard;
