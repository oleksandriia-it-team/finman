export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}
