import { getPrescriptionInvoiceStatusText } from '@/lib/functions/prescription-invoice-helper.function';
import { IPrescriptionInvoiceResponse } from '@/lib/interfaces/services/prescription-invoice';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

interface IPrescriptionInvoicePdfProps {
    prescriptionInvoiceData: IPrescriptionInvoiceResponse;
}

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 3,
        borderBottomColor: '#2563eb',
    },
    headerLeft: {
        flex: 2,
    },
    headerRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 2,
    },
    pharmacyInfo: {
        fontSize: 12,
        color: '#374151',
        lineHeight: 1.5,
    },
    invoiceNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#dc2626',
        marginBottom: 5,
    },
    invoiceDate: {
        fontSize: 12,
        color: '#6b7280',
    },
    statusContainer: {
        marginTop: 10,
        padding: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    statusPending: {
        backgroundColor: '#fef3c7',
        borderWidth: 1,
        borderColor: '#f59e0b',
    },
    statusPaid: {
        backgroundColor: '#d1fae5',
        borderWidth: 1,
        borderColor: '#10b981',
    },
    statusCanceled: {
        backgroundColor: '#fee2e2',
        borderWidth: 1,
        borderColor: '#ef4444',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    statusTextPending: {
        color: '#d97706',
    },
    statusTextPaid: {
        color: '#059669',
    },
    statusTextCanceled: {
        color: '#dc2626',
    },
    section: {
        marginTop: 10,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#e5e7eb',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    infoLabel: {
        width: 120,
        fontSize: 11,
        fontWeight: 'bold',
        color: '#374151',
    },
    infoValue: {
        flex: 1,
        fontSize: 11,
        color: '#1f2937',
    },
    table: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderBottomWidth: 2,
        borderBottomColor: '#d1d5db',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    tableRowAlternate: {
        backgroundColor: '#f9fafb',
    },
    tableHeaderText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#374151',
    },
    tableCellText: {
        fontSize: 10,
        color: '#1f2937',
    },
    descriptionCol: {
        width: '45%',
    },
    quantityCol: {
        width: '15%',
        textAlign: 'center',
    },
    priceCol: {
        width: '20%',
        textAlign: 'right',
    },
    totalCol: {
        width: '20%',
        textAlign: 'right',
    },
    totalSection: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    totalContainer: {
        width: 250,
        backgroundColor: '#f8fafc',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#475569',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e40af',
    },
    footer: {
        marginTop: 30,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 10,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 1.4,
    },
    watermark: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        fontSize: 60,
        color: '#f1f5f9',
        opacity: 0.1,
        zIndex: -1,
    },
});

const PrescriptionInvoicePdf = ({ prescriptionInvoiceData }: IPrescriptionInvoicePdfProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PAID':
                return [styles.statusContainer, styles.statusPaid];
            case 'CANCELED':
                return [styles.statusContainer, styles.statusCanceled];
            default:
                return [styles.statusContainer, styles.statusPending];
        }
    };

    const getStatusTextStyle = (status: string) => {
        switch (status) {
            case 'PAID':
                return [styles.statusText, styles.statusTextPaid];
            case 'CANCELED':
                return [styles.statusText, styles.statusTextCanceled];
            default:
                return [styles.statusText, styles.statusTextPending];
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Watermark */}
                <Text style={styles.watermark}>DELTA SURYA PHARMACY</Text>

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>INVOICE</Text>
                        <Text style={styles.subtitle}>Delta Surya Pharmacy</Text>
                        <Text style={styles.pharmacyInfo}>
                            Jl. Pahlawan No.9, Jati, Kec. Sidoarjo, Kabupaten Sidoarjo, Jawa Timur 61211{'\n'}
                            Telp: (021) 1234-5678{'\n'}
                            Email: info@dev.com
                        </Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.invoiceDate}>{formatDate(prescriptionInvoiceData.issued_at)}</Text>
                        <View style={getStatusStyle(prescriptionInvoiceData.status)}>
                            <Text style={getStatusTextStyle(prescriptionInvoiceData.status)}>
                                {getPrescriptionInvoiceStatusText(prescriptionInvoiceData.status)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Invoice Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informasi Invoice</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>ID Invoice:</Text>
                        <Text style={styles.infoValue}>{prescriptionInvoiceData.id}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Status:</Text>
                        <Text style={styles.infoValue}>{getPrescriptionInvoiceStatusText(prescriptionInvoiceData.status)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Tanggal Terbit:</Text>
                        <Text style={styles.infoValue}>{formatDate(prescriptionInvoiceData.issued_at)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Tanggal Bayar:</Text>
                        <Text style={styles.infoValue}>{formatDate(prescriptionInvoiceData.paid_at)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nama Dokter:</Text>
                        <Text style={styles.infoValue}>{prescriptionInvoiceData.prescription?.doctor_name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nama Apoteker:</Text>
                        <Text style={styles.infoValue}>{prescriptionInvoiceData.prescription?.pharmacist_name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nama Pasien:</Text>
                        <Text style={styles.infoValue}>{prescriptionInvoiceData.prescription?.patient_name}</Text>
                    </View>
                </View>

                {/* Invoice Details Table */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detail Invoice</Text>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderText, styles.descriptionCol]}>Deskripsi</Text>
                            <Text style={[styles.tableHeaderText, styles.quantityCol]}>Jumlah</Text>
                            <Text style={[styles.tableHeaderText, styles.priceCol]}>Harga Satuan</Text>
                            <Text style={[styles.tableHeaderText, styles.totalCol]}>Total Harga</Text>
                        </View>

                        {/* Table Rows */}
                        {prescriptionInvoiceData.prescription_invoice_details.map((detail, index) => (
                            <View key={detail.id} style={[styles.tableRow, ...(index % 2 === 1 ? [styles.tableRowAlternate] : [])]}>
                                <Text style={[styles.tableCellText, styles.descriptionCol]}>{detail.description}</Text>
                                <Text style={[styles.tableCellText, styles.quantityCol]}>{detail.quantity}</Text>
                                <Text style={[styles.tableCellText, styles.priceCol]}>{formatCurrency(detail.unit_price)}</Text>
                                <Text style={[styles.tableCellText, styles.totalCol]}>{formatCurrency(detail.total_price)}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Total Section */}
                <View style={styles.totalSection}>
                    <View style={styles.totalContainer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Amount:</Text>
                            <Text style={styles.totalAmount}>{formatCurrency(prescriptionInvoiceData.total_amount)}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Terima kasih atas kepercayaan Anda kepada Delta Surya Pharmacy{'\n'}
                        Untuk pertanyaan, hubungi customer service kami di (021) 1234-5678{'\n'}
                        Invoice ini digenerate secara otomatis pada {formatDate(new Date().toISOString())}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default PrescriptionInvoicePdf;
