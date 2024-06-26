import { create } from "zustand";

export const userStore = create((set) => ({
  user: {
    email: "admin@pro-man.vercel.app",
    password: "Admin@1234"
  },
  setUser: (newUser) => set({ user: newUser }),
}));

export const tasksStore = create((set) => ({
  tasks: null,
  setTasks: (newTasks) => set({ tasks: newTasks })
}))