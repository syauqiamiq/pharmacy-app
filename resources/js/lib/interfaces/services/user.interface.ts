export interface IUserResponse {
  id: string;
  is_active: number;
  name: string;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}