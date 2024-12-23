import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isSigningUp: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  user: null,
isLoggingIn:false,
  // Signup function
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      set({ isSigningUp: false, user: null });
      toast.error(
        error.response.data.message || "An error occurred during signup"
      );
    }
  },

  // Login function
  login: async (credentials) => {
    set ({isLoggingIn:true});
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user ,isLoggingIn:false});
      toast.success("Login successful");
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred during login"
      );
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logout successful");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(
        error?.response?.data?.message || "Logout failed"
      );
    }
  },

  // Authentication check function
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    //toast.error(error.response.data.message || "An error occurred during authentication check");
    }
  },
}));
