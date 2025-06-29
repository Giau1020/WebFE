import api from './api';
import type { Patient, PatientResponse } from '@/types/patient.d';

export const patientService = {
  async getPatients(
    page: number = 1,
    pageSize: number = 10,
    search?: string,
    status?: string
  ): Promise<PatientResponse> {
    try {
      const params = { page, pageSize, search, status };
      const response = await api.get('/patients', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  async getPatientById(id: string): Promise<Patient> {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient:', error);
      throw error;
    }
  },

  async createPatient(patient: Omit<Patient, 'key'>): Promise<Patient> {
    try {
      const response = await api.post('/patients', patient);
      return response.data;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  },

  async updatePatient(id: string, patient: Partial<Patient>): Promise<Patient> {
    try {
      const response = await api.put(`/patients/${id}`, patient);
      return response.data;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  },

  async deletePatient(id: string): Promise<void> {
    try {
      await api.delete(`/patients/${id}`);
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  },
};
