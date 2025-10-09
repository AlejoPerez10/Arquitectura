import Form from '@/components/form';
import { useRouter } from 'next/router';
import React, { useState} from 'react';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { IconChevronLeftPipe } from '@tabler/icons-react';

const inputsSignUp = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
    required: true,
  },
  {
    name: 'last name',
    type: 'text',
    placeholder: 'Last Name',
    required: false,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
  {
    name: 'confirm password',
    type: 'password',
    placeholder: 'Confirm Password',
    required: true,
  }
];

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  /*const handleSignUpSubmit = (signUpData) => {
    const { email, password, 'confirm password': confirmPassword, name, 'last name': lastName } = signUpData;

    if (password.length <= 6) {
      setError('Password must be more than 6 characters');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (localStorage.getItem(email)) {
      setError('User already exists');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Crear y guardar nuevo usuario
    const newUser = { Email: email, Password: password, Name: name, LastName: lastName, Trips: [] };
    localStorage.setItem(email, JSON.stringify(newUser));
    setMessage('Account created successfully');

    setTimeout(() => {
      setMessage('');
      router.push('/'); // Redirige al login después del registro
    }, 2000);
  };*/

  const handleSignUpSubmit = async (signUpData) => {
  const { email, password, 'confirm password': confirmPassword, name, 'last name': lastName } = signUpData;

  if (password.length <= 6) {
    setError('Password must be more than 6 characters');
    setTimeout(() => setError(''), 3000);
    return;
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    setTimeout(() => setError(''), 3000);
    return;
  }

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, lastName, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Error creating user');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setMessage('Account created successfully');
    setTimeout(() => {
      setMessage('');
      router.push('/');
    }, 2000);
  } catch (error) {
    setError('Server error');
    setTimeout(() => setError(''), 3000);
  }
};


  return (
    <>

      <Link href="/">
        <IconChevronLeftPipe color='#ffd05a' className={`position-absolute ${styles.leftArrow}`}/>
      </Link>

      <div className='d-flex flex-column min-vh-100 position-relative'>
        <div className='flex-fill'>

          <Form
            title='Sign Up'
            inputs={inputsSignUp}
            btn='SUBMIT'
            footer={{ text: "¡ Create an account !", linkHref: '/' }}
            onSubmit={handleSignUpSubmit}
          />

          {error && <p className="position-absolute text-center alert alert-danger" style={{width:'35%', marginTop:'5px', top:'1%', right:'28.5%'}}>{error}</p>}
          
          {message && <p className="position-absolute text-center alert alert-success" style={{width:'35%', marginTop:'5px', top:'1%', right:'28.5%'}}>{message}</p>}

        </div>

      </div>
    </>
  );
}