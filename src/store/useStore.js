import { create } from "zustand";

export const userStore = create((set) => ({
  user: {
    email: "admin@pro-man.vercel.app",
    password: "Admin@1234"
  },
  setUser: user => set({ user: user }),
}));
