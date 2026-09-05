import { create } from "zustand";

interface AppState {
  /** Mobile navigation drawer */
  isMobileDrawerOpen: boolean;
  openMobileDrawer: () => void;
  closeMobileDrawer: () => void;
  toggleMobileDrawer: () => void;

  /** Lead capture modal */
  isLeadModalOpen: boolean;
  openLeadModal: () => void;
  closeLeadModal: () => void;
  toggleLeadModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMobileDrawerOpen: false,
  openMobileDrawer: () => set({ isMobileDrawerOpen: true }),
  closeMobileDrawer: () => set({ isMobileDrawerOpen: false }),
  toggleMobileDrawer: () =>
    set((state) => ({ isMobileDrawerOpen: !state.isMobileDrawerOpen })),

  isLeadModalOpen: false,
  openLeadModal: () => set({ isLeadModalOpen: true }),
  closeLeadModal: () => set({ isLeadModalOpen: false }),
  toggleLeadModal: () =>
    set((state) => ({ isLeadModalOpen: !state.isLeadModalOpen })),
}));
