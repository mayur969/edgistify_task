import { create } from "zustand";
import { productApi } from "../services/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  fetchProducts: (page: number) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  hasMore: true,
  error: null,
  fetchProducts: async (page: number) => {
    try {
      set({ loading: true });
      const data = await productApi.getProducts(page);
      set(state => ({
        products: page === 1 ? data.products : [...state.products, ...data.products],
        hasMore: data.hasMore,
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ loading: false });
    }
  },
  getProductById: (id: string) => {
    const { products } = get();
    return products.find(product => product._id === id);
  },
}));