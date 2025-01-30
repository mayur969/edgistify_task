import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import authStore from '../../store/authStore';

export const ProtectedRoute = ({ children }: {children: ReactNode}) => {

  const navigate = useNavigate();
  const isLoggedIn = authStore((state) => state.isLoggedIn);
  const user = authStore((state)=> state.user)

  useEffect(()=>{
    if(!isLoggedIn && user){
      navigate("/login", {replace: true});
    }
  }, [navigate])

  return children;
}
