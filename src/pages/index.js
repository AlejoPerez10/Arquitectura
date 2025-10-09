import Form from '@/components/form';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'

const inputsIndex = [
  {name: 'email', type: 'email', placeholder: 'Email', required: true},
  {name: 'password', type: 'password', placeholder: 'Password', required: true}
];

export default function IndexPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  /*const handleLoginSubmit = (loginData) => {
    const { email, password } = loginData;
    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.Password === password) {
      // Guarda al usuario en sesión actual en localStorage
      localStorage.setItem('currentUser', JSON.stringify(storedUser));
      router.push('/tripList'); // Redirige a la página de lista de viajes
    } else {
      setError('Invalid email or password');
      setTimeout(() => setError(''), 3000); // Borra el mensaje de error después de 3 segundos
    }
  }; */

  const handleLoginSubmit = async (loginData) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        router.push('/tripList');
      } else {
        setError(data.message || 'Invalid email or password');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Server error');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <>
      <div className='d-flex flex-column position-relative'>
        
        <div className='flex-fill'>

          <Form
            title='Login'
            inputs={inputsIndex}
            btn='ENTER'
            footer={{
              text: "I don't have an account",
              linkText: 'SIGN UP',
              linkHref: 'signUp'
            }}
            onSubmit={handleLoginSubmit}
          />
        </div>

        {error && <p className={`position-absolute text-center alert alert-danger ${styles.messages}`} style={{width:'40%', marginTop:'5px', top:'1%', right:'20%'}}>{error}</p>}

      </div>
    </>
  );
}