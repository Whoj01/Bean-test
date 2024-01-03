import { api } from "@/lib/axios";

interface UserProps {
  name: string;
  password: string;
}

export const useUserAPI = () => {
  const CreateUser = async (user: UserProps) => {
    const data = await api.post("/user", user)

    return data
  }

  const LoginUser = async (user: UserProps) => {
    const data = await api.post("/user/login", user)

    return data
  }

  return {
    CreateUser,
    LoginUser
  }
}