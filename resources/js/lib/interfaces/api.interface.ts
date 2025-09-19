export interface IApiResponse<T> {
  code: number;
  message: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };

  data: T;
}