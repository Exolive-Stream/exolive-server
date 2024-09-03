
import { useState } from 'react';
import { useLocation } from 'wouter';
import { ModernButton, TextField } from '@/components';


export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [location, navigate] = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin' && password === 'password') {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex-grow flex flex-col items-center bg-primary p-3 m-6 w-full max-w-md rounded-md shadow-md '
    >
      <h1 className='text-3xl font-bold text-primary mb-4'> Login </h1>

      <TextField
        type='email'
        label='Email:'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type='password'
        label='You password:'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className='text-lg font-bold text-red-600 mb-4'>{error}</p>}
      <div className='self-end'>
        <ModernButton onClick={handleSubmit}> Send </ModernButton>
      </div>

      <div
        className='animate-pulse underline cursor-pointer' 
        onClick={() => navigate('/auth/register')}
      >
        Not have account? Register
      </div>
    </form>
  );
}