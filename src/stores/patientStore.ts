import { defineStore } from 'pinia';
import type { Dayjs } from 'dayjs';

export interface Patient {
  key: string; // ID duy nhất của bệnh nhân
  name: string; // Họ và tên
  username: string; // Tên đăng nhập
  dob: string | Dayjs | null; // Ngày tháng năm sinh (chuỗi hoặc Dayjs)
  bloodGroup: string; // Nhóm máu (A+, A-, B+, ...)
  gender: string; // Giới tính (Male, Female, Other)
  cccd: string; // Số CCCD/CMND
  status: string; // Trạng thái (ví dụ: Active, Inactive)
  date: string; // Ngày (có thể là ngày nhập viện hoặc khác)
  password: string; // Số bảo hiểm
}

export const usePatientStore = defineStore('patient', {
  state: (): { patients: Patient[]; selectedRowKeys: string[] } => ({
    patients: [
      {
        key: '1',
        name: 'Grand Rapids',
        date: '11:30 AM 02 Sep 2024',
        password: 'PYBJ89RW',
        status: 'Ext. Hospitalism',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '2',
        name: 'Bell Gardens',
        date: '10:30 AM 01 Sep 2024',
        password: 'WA3A4U3C',
        status: 'In Surgery',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '3',
        name: 'Broomfield',
        date: '12:30 PM 30 Aug 2024',
        password: 'RX10QYE0',
        status: 'Discharge',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '4',
        name: 'Yakima',
        date: '10:00 AM 29 Aug 2024',
        password: 'QZXXJHT5',
        status: 'Expected Stay',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '5',
        name: 'Springfield',
        date: '11:00 AM 29 Aug 2024',
        password: 'IT5H6I2R',
        status: 'Ext. Hospitalism',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '6',
        name: 'Alexandria',
        date: '11:30 AM 29 Aug 2024',
        password: 'WA3A4U3C',
        status: 'Discharge',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '7',
        name: 'Kalamazoo',
        date: '12:30 PM 29 Aug 2024',
        password: 'IT5H6I2R',
        status: 'Ext. Hospitalism',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '8',
        name: 'Grand Rapids',
        date: '01:30 PM 29 Aug 2024',
        password: 'FUJY920J',
        status: 'In Surgery',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '9',
        name: 'Bell Gardens',
        date: '02:30 PM 29 Aug 2024',
        password: 'QZXXJHT5',
        status: 'Discharge',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '10',
        name: 'Broomfield',
        date: '04:30 PM 29 Aug 2024',
        password: 'FUJY920J',
        status: 'Ext. Hospitalism',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
      {
        key: '11',
        name: 'Broomfield',
        date: '04:30 PM 29 Aug 2024',
        password: 'FUJY920J',
        status: 'Ext. Hospitalism',
        username: '',
        dob: null,
        bloodGroup: '',
        gender: '',
        cccd: '',
      },
    ],
    selectedRowKeys: [],
  }),
  actions: {
    addPatient(patient: Patient) {
      this.patients.push(patient);
    },
    deletePatient(key: string) {
      this.patients = this.patients.filter((p) => p.key !== key);
    },
    deleteSelectedPatients() {
      this.patients = this.patients.filter(
        (p) => !this.selectedRowKeys.includes(p.key)
      );
      this.selectedRowKeys = [];
    },
    editPatient(patient: Patient) {
      const index = this.patients.findIndex((p) => p.key === patient.key);
      if (index !== -1) {
        this.patients[index] = { ...this.patients[index], ...patient };
      }
    },
    setSelectedRowKeys(keys: string[]) {
      this.selectedRowKeys = keys; // Giới hạn 5 bệnh nhân
    },
  },
  getters: {
    getPatients: (state) => state.patients,
    getSelectedRowKeys: (state) => state.selectedRowKeys, // Trả về mảng gốc
  },
});
