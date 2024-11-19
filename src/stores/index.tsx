import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CompareProductsState, CartState, WishlistState } from '@/types'

// * HELPER FUNCTIONS
const addProductWithoutDuplicates = <T extends { id: string }>(
  products: T[],
  newProduct: T
): T[] => {
  const productExists = products.some((product) => product.id === newProduct.id)
  return productExists ? products : [...products, newProduct]
}

// * FUNCTIONS STORES
const useCompare = create<CompareProductsState>()(
  persist(
    (set) => ({
      products: [],
      rehydrated: false,
      hasHydrated: () => set(() => ({ rehydrated: true })),
      addProduct: (newProduct) =>
        set((state) => ({
          products: addProductWithoutDuplicates(state.products, newProduct)
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        })),
      removeAllProducts: () => set({ products: [] })
    }),
    {
      name: 'compare-products',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated()
      }
    }
  )
)

const useCart = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      rehydrated: false,
      hasHydrated: () => set(() => ({ rehydrated: true })),
      addProduct: (newProduct) =>
        set((state) => {
          const existingProduct = state.products.find(
            (product) => product.id === newProduct.id
          )
          return existingProduct
            ? {
                products: state.products.map((product) =>
                  product.id === newProduct.id
                    ? {
                        ...product,
                        quantity: product.quantity + newProduct.quantity
                      }
                    : product
                )
              }
            : { products: [...state.products, newProduct] }
        }),
      updateProductQuantity: (id, quantity) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? {
                  ...product,
                  quantity
                }
              : product
          )
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        })),
      removeAllProducts: () => set({ products: [] })
    }),
    {
      name: 'cart-products',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated()
      }
    }
  )
)

const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      products: [],
      rehydrated: false,
      hasHydrated: () => set(() => ({ rehydrated: true })),
      addProduct: (newProduct) =>
        set((state) => ({
          products: addProductWithoutDuplicates(state.products, newProduct)
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        })),
      removeAllProducts: () => set({ products: [] })
    }),
    {
      name: 'wishlist-products',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated()
      }
    }
  )
)

export { useCompare, useCart, useWishlist }
