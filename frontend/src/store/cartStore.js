import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      closeCart: () => set({ isOpen: false }),
      openCart: () => set({ isOpen: true }),
      addItem: (product, size = 'M') => {
        const items = get().items
        const existing = items.find((i) => i._id === product._id && i.size === size)
        if (existing) {
          set({ items: items.map((i) => i._id === product._id && i.size === size ? { ...i, qty: i.qty + 1 } : i) })
        } else {
          set({ items: [...items, { ...product, size, qty: 1 }] })
        }
        set({ isOpen: true })
      },
      removeItem: (id, size) => set((s) => ({ items: s.items.filter((i) => !(i._id === id && i.size === size)) })),
      updateQty: (id, size, qty) => {
        if (qty <= 0) {
          set((s) => ({ items: s.items.filter((i) => !(i._id === id && i.size === size)) }))
        } else {
          set((s) => ({ items: s.items.map((i) => i._id === id && i.size === size ? { ...i, qty } : i) }))
        }
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: 'tanz-cart' }
  )
)

export default useCartStore