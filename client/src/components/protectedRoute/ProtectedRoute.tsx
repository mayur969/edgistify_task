import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import authStore from '../../store/authStore';

export const ProtectedRoute = ({ children }: {children: ReactNode}) => {

  const navigate = useNavigate();
  const isLoggedIn = authStore((state) => state.isLoggedIn);

  useEffect(()=>{
    if(!isLoggedIn){
      navigate("/login", {replace: true});
    }
  }, [navigate])

  return children;
}
