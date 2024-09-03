
import { useLocation } from "wouter";
import { LoginForm } from "./_LoginForm";
import { RegisterForm } from "./_RegisterForm";

import { hotgirlImg1, hotgirlImg2 } from '@/assets';
import { TextLogo } from "@/components";

export function AuthPage() {
  const [location, navigate] = useLocation();

  return (
    <main
      className={`w-full flex flex-col items-stretch justify-center h-screen relative`}
    >
      <div
        className="absolute z-0 top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${location === '/auth/login' ? hotgirlImg1 : hotgirlImg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.05,
        }}
      />
      <div className='z-10 text-3xl p-6'>
        <TextLogo />
      </div>
      <div className='w-full flex-grow flex items-center justify-center'>
        {
          location === '/auth/login' ? <LoginForm /> :
            location === '/auth/register' ? <RegisterForm /> :
              navigate('/')
        }
      </div>
    </main> 
  )
}