
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      username: '',
      email: '',
      token: '',
      isLoggedIn: false,

      setToken: (token) => set({ token }),
      login: (email, token) => set({ email, token, isLoggedIn: true }),
      logout: () => set({ email: '', token: '', isLoggedIn: false }),
    }),
    {
      name: 'user-store'
    }
  )
)