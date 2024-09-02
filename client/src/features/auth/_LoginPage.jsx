// LoginPage.jsx
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { ModernButton } from '@/components'; 
import { hotgirlImg1 } from '@/assets';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [location, navigate] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (username === 'admin' && password === 'password') {
      navigate('/');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <main 
      className={`bg-[url\(${hotgirlImg1}\)] bg-opacity-20 w-full flex flex-col items-center justify-center h-screen`}
   
    >
      <form onSubmit={handleSubmit} className='bg-primary p-6 rounded-md shadow-md'>
        <h1 className='text-3xl font-bold text-primary mb-4'>Iniciar sesión</h1>
        <div className='mb-4'>
          <label className='block text-lg font-bold text-primary mb-2' htmlFor='username'>Nombre de usuario</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-2 rounded-md text-lg font-bold bg-black text-primary'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-bold text-primary mb-2' htmlFor='password'>Contraseña</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 rounded-md text-lg font-bold bg-black text-primary'
          />
        </div>
        {error && <p className='text-lg font-bold text-red-600 mb-4'>{error}</p>}
        <ModernButton type='submit'>Iniciar sesión</ModernButton>
      </form>
    </main>
  );
}