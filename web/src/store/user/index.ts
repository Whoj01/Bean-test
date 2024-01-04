import { jwtDecode } from "jwt-decode";
import { create } from 'zustand'

interface User {
  id: string
  name: string
}

interface stateProps {
  user: User | null
}

interface actionsProps {
  addUser: (token: string) => void

  removeUser: () => void
}

interface storeProps {
  actions: actionsProps

  states: stateProps
}

const jwtDecodeToken =  (token: string) => {
  const tokenDecoded: any = jwtDecode(token)

  return tokenDecoded?.payload
}

export const useUserStore = create<storeProps>((set) => ({
  actions: {
    addUser: (user) =>
      set((state) => ({
        states: {
          user: jwtDecodeToken(user)
        },
      })),
    removeUser: () => set((state) => ({ states: { user: null } })), 
  },
  states: {
    user: null,
  },
}))