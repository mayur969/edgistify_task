import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  fullName: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductsResponse {
  products: Product[];
  hasMore: boolean;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  _id: string;
  products: Array<{
    productId: {
      _id: string;
      name: string;
      price: number;
      image: string;
      description: string;
    };
    quantity: number;
  }>;
}

interface Address{
  shippingAddress: string
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },
};

export const productApi = {
  getProducts: async (page: number): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(`/products/getProducts`, {
      params: { page },
    });
    return response.data;
  },
};

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get("/cart");
    return response.data.cart;
  },

  addToCart: async (item: CartItem): Promise<void> => {
    await api.post("/cart/addProduct", item);
  },

  updateQuantity: async (
    productId: string,
    action: "increase" | "decrease"
  ): Promise<void> => {
    await api.put("/cart/updateProductQuantity", { productId, action });
  },
};

export const orderApi = {
  confirmOrder: async (data: Address): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/orders", data);
    return response.data;
  }
};
