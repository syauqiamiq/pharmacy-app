export interface IPatientResponse {
    id: string;
    name: string;
    medic_record_number?: string;
}

export interface ICreatePatientPayload {
    name: string;
    medic_record_number?: string;
}
export interface IUpdatePatientPayload {
    patient_id: string;
    name?: string;
    medic_record_number?: string;
}
