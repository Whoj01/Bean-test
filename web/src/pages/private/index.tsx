import { useCookies } from "@/hooks/useCookies";
import { api } from "@/lib/axios";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { actions: { addUser } } = useUserStore()
  const token = useCookies().getCookie('token');
  const isAuthenticated = !!token;

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');

    addUser(token)
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }, [isAuthenticated, navigate]);

  return children;
};