import { defineStore } from 'pinia';
import type { Patient } from '@/types/patient';
import { patientService } from '@/services/patientService';

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [] as Patient[],
    selectedRowKeys: [] as string[],
    total: 0,
  }),
  getters: {
    getPatients: (state) => state.patients,
    getSelectedRowKeys: (state) => state.selectedRowKeys,
    getTotal: (state) => state.total,
  },
  actions: {
    async fetchPatients(
      page: number = 1,
      pageSize: number = 10,
      search?: string,
      status?: string
    ) {
      try {
        const response = await patientService.getPatients(
          page,
          pageSize,
          search,
          status
        );
        this.patients = response.data;
        this.total = response.total;
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    },
    async fetchPatientById(id: string) {
      try {
        const patient = await patientService.getPatientById(id);
        return patient;
      } catch (error) {
        console.error('Failed to fetch patient:', error);
        throw error;
      }
    },
    async createPatient(patient: Omit<Patient, 'key'>) {
      try {
        const newPatient = await patientService.createPatient(patient);
        this.patients.push(newPatient);
        this.total += 1;
      } catch (error) {
        console.error('Failed to create patient:', error);
        throw error;
      }
    },
    async updatePatient(id: string, patient: Partial<Patient>) {
      try {
        const updatedPatient = await patientService.updatePatient(id, patient);
        const index = this.patients.findIndex((p) => p.key === id);
        if (index !== -1) {
          this.patients[index] = { ...this.patients[index], ...updatedPatient };
        }
      } catch (error) {
        console.error('Failed to update patient:', error);
        throw error;
      }
    },
    async deletePatient(id: string) {
      try {
        await patientService.deletePatient(id);
        this.patients = this.patients.filter((p) => p.key !== id);
        this.total -= 1;
      } catch (error) {
        console.error('Failed to delete patient:', error);
        throw error;
      }
    },
    setSelectedRowKeys(keys: string[]) {
      this.selectedRowKeys = keys;
    },
    async deleteSelectedPatients() {
      if (this.selectedRowKeys.length > 0) {
        for (const key of this.selectedRowKeys) {
          await this.deletePatient(key);
        }
        this.selectedRowKeys = [];
      }
    },
  },
});
