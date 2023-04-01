import { useState } from 'react';

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import { Button, BUTTON_TYPE_CLASSES } from '../button/button.component';
import { FormInput } from '../form-input/form-input.component';

import { ButtonsContainer, SignInFormContainer } from './sing-in-form.styles';

const initialFormFields = {
  email: '',
  password: '',
};

export const SignInForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields);

  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(initialFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (err) {
      if (['auth/wrong-password', 'auth/user-not-found'].includes(err.code)) {
        alert('Incorret password or email.');
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <SignInFormContainer>
      <h2>Already have an account</h2>
      <span>Sign in with yout email and password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='submit'>
            Sign In
          </Button>

          <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle} >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInFormContainer>
  )
}
