import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const initialFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields);

  const { displayName, email, password, confirmPassword, } = formFields;

  const resetFormFields = () => {
    setFormFields(initialFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match!');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use.');
      } else{
        console.error('User creation encountered an error', err.message);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div>
      <h1>Sign up with yout email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          value={displayName}
          onChange={handleChange}
          name='displayName'
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={handleChange}
          name='email'
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={handleChange}
          name='password'
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={handleChange}
          name='confirmPassword'
        />

        <button type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}
