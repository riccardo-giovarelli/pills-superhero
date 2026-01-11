import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { appState } from '@/stores/app/useAppStore.lib';
import { AppState } from '@/stores/app/useAppStore.type';


const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // State
      ...appState,

      // Actions
      setMode: (newMode) => set({ mode: newMode }),
    }),
    {
      name: 'psh-app-storage',
    }
  )
);

export default useAppStore;
