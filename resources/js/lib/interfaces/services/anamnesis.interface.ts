import { IDoctorResponse } from './doctor.interface';
import { IVisitResponse } from './visit.interface';

export interface ICreateAnamnesisPayload {
    visit_id: string;
    patient_complaint?: string;
    present_illness?: string;
    past_illness?: string;
    allergy_history?: string;
    family_history?: string;
    madication_history?: string;
    physical_exam?: string;
    note?: string;
    anamnesis_details?: {
        key: string;
        value: string;
        unit: string;
    }[];
}

export interface IAnamnesisResponse {
    id: string;
    visit_id: string;
    doctor_id: string;
    patient_complaint: string;
    present_illness: string;
    past_illness: string;
    allergy_history: string;
    family_history: string;
    medication_history: string;
    physical_exam: string;
    note: string;
    created_at: string;
    updated_at: string;
    doctor?: IDoctorResponse;
    visit?: IVisitResponse;
    anamnesis_details?: IAnamnesisDetail[];
}

export interface IAnamnesisDetail {
    id: string;
    anamnesis_id: string;
    key: string;
    value: string;
    unit: string;
}
