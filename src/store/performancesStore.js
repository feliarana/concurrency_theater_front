import { create } from "zustand";
import { fetchPerformances } from "../api/performancesApi"; // Asegúrate de importar tu función de API

const usePerformancesStore = create((set) => ({
  performances: JSON.parse(localStorage.getItem("performances")) || [],
  loading: false,
  setPerformances: (performances) => {
    set({ performances });
  },
  fetchAndSetPerformances: async () => {
    set({ loading: true });
    try {
      const data = await fetchPerformances();
      set({ performances: data });
    } catch (error) {
      console.error("Error fetching performances:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePerformancesStore;
