import { Redirect, useLocation } from "wouter"; 
import { LoginPage } from "./_LoginPage";
import { RegisterPage } from "./_RegisterPage";


export function AuthPage() { 
  const [location, navigate] = useLocation();
 
  return (
    location === '/auth/login' ? <LoginPage /> :
    location === '/auth/register' ? <RegisterPage /> :
    
    /* Wrong subpath */
    <Redirect to='/auth/login'/>
  )
}