import { create } from "zustand";
import { fetchPerformances } from "../api/performancesApi";

const usePerformancesStore = create((set, get) => ({
  performances: [],
  loading: false,
  error: null,

  setPerformances: (performances) => {
    set({ performances });
    // Persistir en localStorage
    localStorage.setItem("performances", JSON.stringify(performances));
  },

  fetchAndSetPerformances: async () => {
    // Si ya hay performances y no es forzado, no hacer el fetch
    if (get().performances.length > 0) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const data = await fetchPerformances();
      set({
        performances: data,
        loading: false
      });
      localStorage.setItem("performances", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching performances:", error);
      set({
        error: error.message,
        loading: false
      });
    }
  },

  // Método para forzar la recarga de performances
  refreshPerformances: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPerformances();
      set({
        performances: data,
        loading: false
      });
      localStorage.setItem("performances", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching performances:", error);
      set({
        error: error.message,
        loading: false
      });
    }
  }
}));

export default usePerformancesStore;