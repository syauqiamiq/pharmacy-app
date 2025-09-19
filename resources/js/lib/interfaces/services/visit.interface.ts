import { IDoctorResponse } from "./doctor.interface";
import { IPatientResponse } from "./patient.interface";


export interface IVisitResponse {
  id: string;
  visit_date: string;
  doctor_id: string;
  patient_id: string;
  status:string;
  doctor: IDoctorResponse;
  patient: IPatientResponse;
}

