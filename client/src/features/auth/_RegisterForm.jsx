
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ModernButton, TextField } from '@/components';
import { useUserStore } from '@/store'; 
import { ResponseError, parseError, validateEmail } from '@/utils';
import axios from 'redaxios'

export function RegisterForm() {
  const [token, setToken] = useUserStore(s => [s.token, s.setToken]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [error, setError] = useState();
  const [sending, setSending] = useState(false);
  const [location, navigate] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      if (password !== rpassword) throw new ResponseError({ msg: 'Passwords do not match' });
      if (!validateEmail(email)) throw new ResponseError({ msg: 'Invalid email' }); 

      const response = await axios.post('/api/auth/register', {
        username: email.split('@')[0],
        email,
        password,
      });
      setToken(response.data.token); 
      setSending(false);

      navigate('/auth/login');

    } catch ({ status, data }) {
      setSending(false);
      if (data.msg) return setError(data.msg);
      if (data.error) return setError(parseError(data.error));
      return setError(parseError(null));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex-grow flex flex-col items-center bg-primary p-3 m-6 w-full max-w-md rounded-md shadow-md '
    >
      <h1 className='text-3xl font-bold text-primary mb-4'> Join with us! </h1>

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
      <TextField
        type='password'
        label='Repeat password:'
        value={rpassword}
        onChange={(e) => setRPassword(e.target.value)}
      />
      {error && <p className='text-lg font-bold text-red-600 mb-4'>{error}</p>}
      <div className='self-end'>
        <ModernButton
          onClick={handleSubmit}
          disable={sending}
        >
          Create account
        </ModernButton>
      </div>

      <div
        className='animate-pulse underline cursor-pointer'
        onClick={() => navigate('/auth/login')}
      >
        Already have an account? Login
      </div>
    </form>
  );
}