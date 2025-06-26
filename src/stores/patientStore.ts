import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const usePatientStore = defineStore('patients', () => {
  const patients = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPatients = async () => {
    loading.value = true;
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      patients.value = response.data.map((item: any) => ({
        key: item.id,
        name: item.name,
        birthDate: `1990-01-01`, // Giả lập
        status: Math.random() > 0.5 ? 'Active' : 'Inactive',
        avatar: `https://via.placeholder.com/100?text=${item.name}`,
      }));
      error.value = null;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const addPatient = async (patient: any) => {
    loading.value = true;
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        patient
      );
      const newPatient = response.data;
      patients.value.push({
        key: newPatient.id,
        name: newPatient.name,
        birthDate: patient.birthDate || '1990-01-01',
        status: patient.status || 'Active',
        avatar: `https://via.placeholder.com/100?text=${newPatient.name}`,
      });
      error.value = null;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const updatePatient = async (patient: any) => {
    loading.value = true;
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${patient.key}`,
        patient
      );
      const index = patients.value.findIndex((p: any) => p.key === patient.key);
      if (index !== -1)
        patients.value[index] = { ...patients.value[index], ...patient };
      error.value = null;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const deletePatient = async (key: number) => {
    loading.value = true;
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${key}`);
      patients.value = patients.value.filter((p: any) => p.key !== key);
      error.value = null;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return {
    patients,
    loading,
    error,
    fetchPatients,
    addPatient,
    updatePatient,
    deletePatient,
  };
});
