export interface Patient {
  key: string;
  name: string;
  date: string;
  insuranceId: string;
  status: 'Active' | 'Inactive';
  username?: string;
  fullName?: string;
  dob?: string;
  bloodGroup?: string;
  gender?: 'Male' | 'Female' | 'Other';
  cccd?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface PatientResponse {
  data: Patient[];
  total: number;
  success: boolean;
  message?: string;
}
