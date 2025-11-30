export interface CreateAccountPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender?: "Male" | "Female" | "Other";
}

export interface CreateAccountResponse {
  message: string;
  data: {
    id: string;
    firstName: string;
    email: string;
  };
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}
