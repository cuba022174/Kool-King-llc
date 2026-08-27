import { create } from "zustand";

interface AppState {
  /** Whether the mobile navigation drawer is open. */
  isMobileDrawerOpen: boolean;
  /** Whether the lead-capture modal is open. */
  isLeadModalOpen: boolean;

  openMobileDrawer: () => void;
  closeMobileDrawer: () => void;
  toggleMobileDrawer: () => void;

  openLeadModal: () => void;
  closeLeadModal: () => void;
  toggleLeadModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isMobileDrawerOpen: false,
  isLeadModalOpen: false,

  openMobileDrawer: () => set({ isMobileDrawerOpen: true }),
  closeMobileDrawer: () => set({ isMobileDrawerOpen: false }),
  toggleMobileDrawer: () =>
    set((state) => ({ isMobileDrawerOpen: !state.isMobileDrawerOpen })),

  openLeadModal: () => set({ isLeadModalOpen: true }),
  closeLeadModal: () => set({ isLeadModalOpen: false }),
  toggleLeadModal: () =>
    set((state) => ({ isLeadModalOpen: !state.isLeadModalOpen })),
}));
