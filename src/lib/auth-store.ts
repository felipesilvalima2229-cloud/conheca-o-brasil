"use client";

import { create } from "zustand";

export type AppSection = "dashboard" | "curiosidades" | "quiz" | "ranking";

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; name: string } | null;
  isLoading: boolean;
  login: (user: { id: string; email: string; name: string }) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

interface NavigationState {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: (user) => set({ isAuthenticated: true, user, isLoading: false }),
  logout: () => set({ isAuthenticated: false, user: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export const useNavigationStore = create<NavigationState>((set) => ({
  activeSection: "dashboard",
  setActiveSection: (activeSection) => set({ activeSection }),
}));
