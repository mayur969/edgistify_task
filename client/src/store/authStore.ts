import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from 'js-cookie';

interface User {
  email: string;
  name: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  reset: () => void;
}

const authStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      setLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
      setUser: (user: User | null) => set({ user }),
      logout: () => {
        Cookies.remove('token');
        
        set({ user: null, isLoggedIn: false });
      },
      reset: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default authStore;