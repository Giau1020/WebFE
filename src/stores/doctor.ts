interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export const useDoctorsStore = defineStore('doctors', () => {
  const doctors = ref<Doctor[]>([
    { id: '1', name: 'Dr. John Doe', specialty: 'Cardiology' },
    { id: '2', name: 'Dr. Jane Smith', specialty: 'Neurology' },
  ]);

  const addDoctor = (doctor: Doctor) => {
    doctors.value.push(doctor);
  };

  const removeDoctor = (id: string) => {
    doctors.value = doctors.value.filter((doctor) => doctor.id !== id);
  };

  return {
    doctors,
    addDoctor,
    removeDoctor,
  };
});
