import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { Button, BUTTON_TYPE_CLASSES } from '../button/button.component';
import { FormInput } from '../form-input/form-input.component';

import './sign-up-from.styles.scss';

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
    <div className='sign-up-container'>
      <h2>Don't have an account</h2>
      <span>Sign up with yout email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type="email"
          required
          value={displayName}
          onChange={handleChange}
          name='displayName'
        />

        <FormInput
          label='E-mail'
          type="email"
          required
          value={email}
          onChange={handleChange}
          name='email'
        />

        <FormInput
          label='Password'
          type="password"
          required
          value={password}
          onChange={handleChange}
          name='password'
        />

        <FormInput
          label='Confirm Password'
          type="password"
          required
          value={confirmPassword}
          onChange={handleChange}
          name='confirmPassword'
        />

        <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.inverted} >
          Sign Up
        </Button>
      </form>
    </div>
  )
}
