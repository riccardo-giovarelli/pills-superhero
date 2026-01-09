import { create } from 'zustand';

import { dashboardState } from './useDashboardStore.lib';
import { DashboardState } from './useDashboardStore.type';


const useDashboardStore = create<DashboardState>((set) => ({
  // State
  ...dashboardState,

  // Actions
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
}));

export default useDashboardStore;
