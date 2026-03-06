import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../utils/api'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const { data } = await api.post('/auth/login', { email, password })
          set({ user: data, token: data.token, loading: false })
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        } catch (err) {
          set({ error: err.response?.data?.message || 'Login failed', loading: false })
        }
      },
      register: async (name, email, password) => {
        set({ loading: true, error: null })
        try {
          const { data } = await api.post('/auth/register', { name, email, password })
          set({ user: data, token: data.token, loading: false })
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        } catch (err) {
          set({ error: err.response?.data?.message || 'Registration failed', loading: false })
        }
      },
      logout: () => {
        set({ user: null, token: null })
        delete api.defaults.headers.common['Authorization']
      },
      clearError: () => set({ error: null }),
    }),
    { name: 'tanz-auth' }
  )
)

export default useAuthStore