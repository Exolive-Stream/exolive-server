
import { create } from 'zustand'

export const useUserStore = create((set) => ({
  username: '',
  email: '',
  isLoggedIn: false,

  login: (username, email) => set({ username, email, isLoggedIn: true }),
  logout: () => set({ username: '', email: '', isLoggedIn: false }),
}))