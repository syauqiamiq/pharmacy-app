import DashboardLayout from '@/lib/layouts/DashboardLayout';
import {
    AuditOutlined,
    BellOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    ExclamationCircleOutlined,
    FileTextOutlined,
    HomeOutlined,
    MedicineBoxOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
    ThunderboltOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { usePage } from '@inertiajs/react';
import { Alert, Avatar, Badge, Button, Card, Col, Divider, List, Progress, Row, Space, Statistic, Table, Tag, Timeline, Typography } from 'antd';

const { Title, Text } = Typography;

const PharmacistDashboardPage = () => {
    const { props } = usePage<any>();

    // Dummy data for pharmacist dashboard
    const pharmacistStats = {
        prescriptionsProcessed: 24,
        medicinesDispensed: 156,
        pendingVerification: 7,
        todayRevenue: 8750000,
    };

    const pendingPrescriptions = [
        {
            id: 'RX001',
            patient: 'Ahmad Rizki',
            doctor: 'Dr. Sarah',
            time: '08:30',
            urgency: 'normal',
            medicines: 3,
        },
        {
            id: 'RX002',
            patient: 'Siti Nurhaliza',
            doctor: 'Dr. Budi',
            time: '09:15',
            urgency: 'urgent',
            medicines: 2,
        },
        {
            id: 'RX003',
            patient: 'Maya Sari',
            doctor: 'Dr. Andi',
            time: '10:00',
            urgency: 'normal',
            medicines: 4,
        },
        {
            id: 'RX004',
            patient: 'Budi Santoso',
            doctor: 'Dr. Lisa',
            time: '10:30',
            urgency: 'high',
            medicines: 1,
        },
    ];

    const lowStockMedicines = [
        { name: 'Paracetamol 500mg', currentStock: 25, minStock: 50, category: 'Analgesik' },
        { name: 'Amoxicillin 250mg', currentStock: 12, minStock: 30, category: 'Antibiotik' },
        { name: 'Omeprazole 20mg', currentStock: 8, minStock: 25, category: 'Lambung' },
        { name: 'Metformin 500mg', currentStock: 15, minStock: 40, category: 'Diabetes' },
    ];

    const quickActions = [
        { label: 'Proses Resep Baru', color: '#1890ff', icon: <PlusOutlined /> },
        { label: 'Cek Stok Obat', color: '#52c41a', icon: <MedicineBoxOutlined /> },
        { label: 'Buat Invoice', color: '#722ed1', icon: <FileTextOutlined /> },
        { label: 'Laporan Penjualan', color: '#fa8c16', icon: <AuditOutlined /> },
    ];

    const recentTransactions = [
        {
            id: 'TRX001',
            time: '14:30',
            patient: 'Ahmad Rizki',
            total: 125000,
            items: 3,
            status: 'completed',
        },
        {
            id: 'TRX002',
            time: '14:15',
            patient: 'Siti Nurhaliza',
            total: 89000,
            items: 2,
            status: 'completed',
        },
        {
            id: 'TRX003',
            time: '13:45',
            patient: 'Budi Santoso',
            total: 245000,
            items: 5,
            status: 'completed',
        },
    ];

    const pharmacyUpdates = [
        {
            title: 'Obat Baru Masuk Stok',
            description: 'Paracetamol dan Amoxicillin telah ditambahkan ke inventori',
            time: '1 jam lalu',
            type: 'stock',
        },
        {
            title: 'Update Harga Obat',
            description: 'Penyesuaian harga untuk 15 item obat generik',
            time: '2 jam lalu',
            type: 'price',
        },
        {
            title: 'Pelatihan Farmasi',
            description: 'Workshop tentang farmakovigilans dijadwalkan minggu depan',
            time: '1 hari lalu',
            type: 'training',
        },
    ];

    const stockColumns = [
        {
            title: 'Nama Obat',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Stok Saat Ini',
            dataIndex: 'currentStock',
            key: 'currentStock',
            render: (stock: number) => <Tag color={stock < 20 ? 'red' : stock < 40 ? 'orange' : 'green'}>{stock} unit</Tag>,
        },
        {
            title: 'Stok Minimum',
            dataIndex: 'minStock',
            key: 'minStock',
            render: (stock: number) => `${stock} unit`,
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Status',
            key: 'status',
            render: (record: any) => (
                <Tag color={record.currentStock < record.minStock * 0.5 ? 'red' : 'orange'}>
                    {record.currentStock < record.minStock * 0.5 ? 'Kritis' : 'Rendah'}
                </Tag>
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            render: () => (
                <Button type="primary" size="small" icon={<ShoppingCartOutlined />}>
                    Pesan
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout title="Dasbor Apoteker" breadcrumbItems={[{ title: 'Apoteker' }, { title: 'Dasbor' }]}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Welcome Section */}
                <Alert
                    message={`Selamat datang, Apt. ${props.auth.user.name}!`}
                    description="Semoga hari ini berjalan dengan lancar. Mari berikan pelayanan farmasi terbaik untuk kesehatan masyarakat."
                    type="success"
                    showIcon
                    icon={<MedicineBoxOutlined />}
                    style={{ marginBottom: 24 }}
                />

                {/* Pharmacist Statistics */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Resep Diproses</span>}
                                value={pharmacistStats.prescriptionsProcessed}
                                prefix={<FileTextOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Obat Diserahkan</span>}
                                value={pharmacistStats.medicinesDispensed}
                                prefix={<MedicineBoxOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Pending Verifikasi</span>}
                                value={pharmacistStats.pendingVerification}
                                prefix={<ExclamationCircleOutlined style={{ color: 'white' }} />}
                                valueStyle={{ color: 'white', fontSize: '28px' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', border: 'none' }}>
                            <Statistic
                                title={<span style={{ color: 'white' }}>Pendapatan Hari Ini</span>}
                                value={pharmacistStats.todayRevenue}
                                prefix={<DollarOutlined style={{ color: 'white' }} />}
                                formatter={(value) => `Rp ${value?.toLocaleString('id-ID')}`}
                                valueStyle={{ color: 'white', fontSize: '24px' }}
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
                                    <ThunderboltOutlined style={{ color: '#faad14' }} /> Aksi Cepat
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

                    {/* Pending Prescriptions */}
                    <Col xs={24} lg={12}>
                        <Card
                            title={
                                <>
                                    <ClockCircleOutlined style={{ color: '#52c41a' }} /> Resep Menunggu Proses
                                </>
                            }
                            style={{ height: '100%' }}
                        >
                            <Timeline
                                items={pendingPrescriptions.map((prescription) => ({
                                    color: prescription.urgency === 'urgent' ? 'red' : prescription.urgency === 'high' ? 'orange' : 'blue',
                                    children: (
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text strong>{prescription.id}</Text>
                                                <Tag
                                                    color={
                                                        prescription.urgency === 'urgent'
                                                            ? 'red'
                                                            : prescription.urgency === 'high'
                                                              ? 'orange'
                                                              : 'blue'
                                                    }
                                                >
                                                    {prescription.urgency === 'urgent'
                                                        ? 'URGENT'
                                                        : prescription.urgency === 'high'
                                                          ? 'TINGGI'
                                                          : 'NORMAL'}
                                                </Tag>
                                            </div>
                                            <Text>{prescription.patient}</Text>
                                            <br />
                                            <Text type="secondary">oleh {prescription.doctor}</Text>
                                            <br />
                                            <Text type="secondary">
                                                {prescription.time} • {prescription.medicines} obat
                                            </Text>
                                        </div>
                                    ),
                                }))}
                            />
                        </Card>
                    </Col>

                    {/* Pharmacy Updates */}
                    <Col xs={24} lg={6}>
                        <Card
                            title={
                                <>
                                    <BellOutlined style={{ color: '#722ed1' }} /> Update Farmasi
                                </>
                            }
                            style={{ height: '100%' }}
                        >
                            <List
                                dataSource={pharmacyUpdates}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Badge color={item.type === 'stock' ? 'green' : item.type === 'price' ? 'blue' : 'orange'} />}
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

                {/* Low Stock Alert */}
                <Card
                    title={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <WarningOutlined style={{ color: '#fa541c', marginRight: 8 }} />
                            <span>Peringatan Stok Rendah</span>
                        </div>
                    }
                >
                    <Table scroll={{ x: 800 }} dataSource={lowStockMedicines} columns={stockColumns} rowKey="name" pagination={false} size="small" />
                </Card>

                {/* Recent Transactions & Performance */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                        <Card
                            title={
                                <>
                                    <HomeOutlined style={{ color: '#13c2c2' }} /> Transaksi Terbaru
                                </>
                            }
                        >
                            <List
                                dataSource={recentTransactions}
                                renderItem={(transaction) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<ShoppingCartOutlined />} style={{ backgroundColor: '#52c41a' }} />}
                                            title={
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Text strong>{transaction.patient}</Text>
                                                    <Text strong style={{ color: '#52c41a' }}>
                                                        Rp {transaction.total.toLocaleString('id-ID')}
                                                    </Text>
                                                </div>
                                            }
                                            description={
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Text type="secondary">
                                                        {transaction.time} • {transaction.items} item
                                                    </Text>
                                                    <Tag color="success">Selesai</Tag>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Card title="📊 Performa Hari Ini">
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Statistic
                                        title="Efisiensi Proses Resep"
                                        value={92.3}
                                        precision={1}
                                        suffix="%"
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                    <Progress percent={92.3} strokeColor="#52c41a" size="small" />
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Statistic
                                        title="Rata-rata Waktu Layanan"
                                        value={4.2}
                                        precision={1}
                                        suffix="menit"
                                        valueStyle={{ color: '#1890ff' }}
                                    />
                                    <Progress percent={78} strokeColor="#1890ff" size="small" />
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Statistic
                                        title="Target Penjualan Harian"
                                        value={87.5}
                                        precision={1}
                                        suffix="%"
                                        valueStyle={{ color: '#722ed1' }}
                                    />
                                    <Progress percent={87.5} strokeColor="#722ed1" size="small" />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Achievement Section */}
                <Card title="🏆 Pencapaian & Penghargaan">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <div
                                style={{
                                    background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                <Title level={4} style={{ color: '#e17055', margin: 0 }}>
                                    🥇 Apoteker Terpercaya
                                </Title>
                                <Text style={{ color: '#e17055' }}>Rating 4.8/5 dari pasien</Text>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <div
                                style={{
                                    background: 'linear-gradient(135deg, #a8e6cf 0%, #88d8c0 100%)',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                <Title level={4} style={{ color: '#00b894', margin: 0 }}>
                                    ⚡ Layanan Tercepat
                                </Title>
                                <Text style={{ color: '#00b894' }}>Rata-rata 4.2 menit per resep</Text>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <div
                                style={{
                                    background: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                }}
                            >
                                <Title level={4} style={{ color: '#e84393', margin: 0 }}>
                                    💼 100% Akurasi
                                </Title>
                                <Text style={{ color: '#e84393' }}>Tidak ada kesalahan bulan ini</Text>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Space>
        </DashboardLayout>
    );
};

export default PharmacistDashboardPage;
