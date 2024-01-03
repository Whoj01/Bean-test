import { useCookies } from "@/hooks/useCookies";
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
  }, [isAuthenticated, navigate]);

  return children;
};