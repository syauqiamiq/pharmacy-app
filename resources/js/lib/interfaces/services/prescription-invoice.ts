import { IPrescriptionResponse } from './prescription.interface';

export interface IPrescriptionInvoiceResponse {
    id: string;
    prescription_id: string;
    total_amount: number;
    status: 'PENDING' | 'PAID' | 'CANCELED';
    issued_at: string | null;
    paid_at: string | null;
    created_at: string;
    updated_at: string;
    prescription?: IPrescriptionResponse;
    prescription_invoice_details: IPrescriptionInvoiceDetailResponse[];
}

export interface IPrescriptionInvoiceDetailResponse {
    id: string;
    prescription_invoice_id: string;
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    created_at: string;
    updated_at: string;
}

export interface IUpdatePrescriptionInvoicePayload {
    prescription_invoice_id: string;
    status: 'PENDING' | 'PAID' | 'CANCELED';
    paid_at?: string;
}
