import { IPrescriptionInvoiceResponse } from './prescription-invoice';

export interface ICreatePrescriptionPayload {
    anamnesis_id: string;
    doctor_name: string;
    doctor_note: string;
    prescription_details?:
        | {
              medicine_id?: string;
              medicine_name: string;
              dosage?: string;
              frequency?: string;
              duration?: string;
              note?: string;
          }[]
        | null;
}

export interface IPrescriptionLogResponse {
    id: string;
    prescription_id: string;
    log_description: string;
    created_at: string;
    updated_at: string;
}

export interface IUpdatePrescriptionPayload {
    prescription_id: string;
    pharmacist_id?: string;
    pharmacist_name?: string;
    pharmacist_note?: string;
    doctor_note?: string;
    status?: string;
    prescription_details?:
        | {
              medicine_id?: string;
              medicine_name: string;
              dosage?: string;
              frequency?: string;
              duration?: string;
              note?: string;
          }[]
        | null;
}
export interface IPrescriptionResponse {
    id: string;
    anamnesis_id: string;
    doctor_id: string;
    doctor_name: string;
    doctor_note: string;
    pharmacist_id: string | null;
    patient_id: string | null;
    patient_name: string | null;
    pharmacist_name: string | null;
    pharmacist_note: string | null;
    invoice_status?: string | null;
    status: string;
    prescription_details?: IPrescriptionDetail[];
    prescription_invoice?: IPrescriptionInvoiceResponse;
    prescription_logs?: IPrescriptionLogResponse[];
}
export interface IPrescriptionDetail {
    id: string;
    prescription_id: string;
    medicine_id: string | null;
    medicine_name: string;
    dosage: string | null;
    frequency: string | null;
    duration: string | null;
    note: string | null;
    quantity?: number;
}
