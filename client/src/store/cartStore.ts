import { create } from 'zustand';
import { cartApi } from '../services/api';

interface CartItem {
    productId: string;
    quantity: number;
}

interface CartProduct {
    productId: {
        _id: string;
        name: string;
        price: number;
        image: string;
        description: string;
    };
    quantity: number;
}

interface CartStore {
    items: CartProduct[];
    isLoading: boolean;
    error: string | null;
    totalPrice: number;
    fetchCart: () => Promise<void>;
    addToCart: (item: CartItem) => Promise<void>;
    updateQuantity: (productId: string, action: 'increase' | 'decrease') => Promise<void>;
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],
    isLoading: false,
    error: null,
    totalPrice: 0,

    fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
            const cart = await cartApi.getCart();
            const totalPrice = cart.products.reduce((total, item) => total + item.productId.price * item.quantity, 0);
            set({ items: cart.products, totalPrice, isLoading: false });
        } catch (error) {
            set({ 
                error: 'Failed to fetch cart', 
                isLoading: false 
            });
            throw error;
        }
    },

    addToCart: async (item: CartItem) => {
        set({ isLoading: true, error: null });
        try {
            console.log(item)
            await cartApi.addToCart(item);

            const cart = await cartApi.getCart();
            const totalPrice = cart.products.reduce((total, item) => total + item.productId.price * item.quantity, 0);
            set({ items: cart.products, totalPrice, isLoading: false });
        } catch (error) {
            set({ 
                error: 'Failed to add item to cart', 
                isLoading: false 
            });
            throw error;
        }
    },

    updateQuantity: async (productId: string, action: 'increase' | 'decrease') => {
        set({ isLoading: true, error: null });
        try {
            await cartApi.updateQuantity(productId, action);
            const cart = await cartApi.getCart();
            const totalPrice = cart.products.reduce((total, item) => total + item.productId.price * item.quantity, 0);
            set({ items: cart.products, totalPrice, isLoading: false });
        } catch (error) {
            set({ 
                error: 'Failed to update quantity', 
                isLoading: false 
            });
            throw error;
        }
    }
})); 