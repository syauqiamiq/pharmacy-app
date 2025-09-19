import { IUserResponse } from "./user.interface";

export interface IDoctorResponse {
  id: string;
  name: string | null;
  specialization: string;
  license_number: string;
  user_id: string;
  user?: IUserResponse;
  created_at: string;
  updated_at?: string;
  deleted_at?: string | null;
}