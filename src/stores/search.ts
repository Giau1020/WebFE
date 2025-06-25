import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', () => {
  const searchTerm = ref<string>('');

  const setSearchTerm = (value: string) => {
    searchTerm.value = value;
  };

  return { searchTerm, setSearchTerm };
});
