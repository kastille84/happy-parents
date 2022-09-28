import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import Signup from '../Signup';

describe('Signup', () => {
  beforeEach(() => {
    render(<BrowserRouter>
      <Signup />
    </BrowserRouter>)
  })

  describe('Render', () => {
    it('should render Signup Page', () => {
      expect(screen.getByRole('heading', {
        name: 'Register Your Family'
      })).toBeInTheDocument();
    })
  
    it('should render the signup form', () => {
      expect(screen.getByLabelText('Parent Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Family Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Family Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Family Password')).toBeInTheDocument();
      expect(screen.getByRole('button', {
        name: 'Sign Up'
      })).toBeInTheDocument();
    })
  })

  describe('Form', () => {
    let parentNameInput,
    parentNameInputMessage,
    familyEmailInput, 
    familyEmailInputMessage,
    familyPasswordInput, 
    familyPasswordInputMessage,
    confirmFamilyPasswordInput, 
    confirmFamilyPasswordInputMessage,
    formButton;
    beforeEach(() => {
      parentNameInput = screen.getByLabelText('Parent Name');
      parentNameInputMessage = screen.getByTestId('parentName-message');
      familyEmailInput = screen.getByLabelText('Family Email');
      familyEmailInputMessage = screen.getByTestId('familyEmail-message');
      familyPasswordInput = screen.getByLabelText('Family Password');
      familyPasswordInputMessage = screen.getByTestId('familyPassword-message')
      confirmFamilyPasswordInput = screen.getByLabelText('Confirm Family Password');
      confirmFamilyPasswordInputMessage = screen.getByTestId('confirmFamilyPassword-message');
      formButton = screen.getByRole('button', { name: 'Sign Up'});
    })

    describe('Errors', () => {
      it('should show error message if parent name is empty', async() => {
        userEvent.click(formButton);
        await waitFor(() =>
        expect(parentNameInputMessage.textContent).toBe('Parent name is required'))
      })

      it('should show error message if family email is empty', async() => {
        userEvent.click(formButton);
        await waitFor(() =>
        expect(screen.getByTestId('familyEmail-message').textContent).toBe('Email is required'))
      })

      it('should show error message if family email is not correct format', async() => {
        userEvent.type(familyEmailInput, 'edMar');
        userEvent.click(formButton);
        await waitFor(() => 
        expect(familyEmailInputMessage.textContent).toBe('Please enter a valid email')
        )
      })

      it('should show error message if family password is empty', async() => {
        userEvent.click(formButton);
        await waitFor(() => 
          expect(familyPasswordInputMessage.textContent).toBe('Password is required')
        )
      })

      it('should show error message if family password is less than 6 chars', async() => {
        userEvent.type(familyPasswordInput,'1234');
        userEvent.click(formButton);
        await waitFor(() => 
          expect(familyPasswordInputMessage.textContent).toBe('Password should be 6 or more characters')
        )
      })

      it('should show error message if confirm family password is empty', async() => {
        userEvent.click(formButton);
        await waitFor(() => {
          expect(confirmFamilyPasswordInputMessage.textContent).toBe('Password confirmation is required')
        })
      })

      it('should show error message if family password and confirm password are diffrent', async() => {
        userEvent.type(familyPasswordInput,'12345678');
        userEvent.type(confirmFamilyPasswordInput,'876543221')
        userEvent.click(formButton);
        await waitFor(() => 
          expect(confirmFamilyPasswordInputMessage.textContent).toBe('Passwords must match')
        )
      })

      it('should NOT show error message is all inputs are filled in correctly', async() => {
        userEvent.type(parentNameInput, 'Edwin');
        userEvent.type(familyEmailInput, 'edMar@gmail.com');
        userEvent.type(familyPasswordInput, 'test1234');
        userEvent.type(confirmFamilyPasswordInput, 'test1234');
        userEvent.click(formButton);
        await waitFor(() => {
          expect(parentNameInputMessage.textContent).toBe('');
          expect(familyEmailInputMessage.textContent).toBe('The email is used as the entry point for the family');
          expect(familyPasswordInputMessage.textContent).toBe('The password is used by family to gain access');
          expect(confirmFamilyPasswordInputMessage.textContent).toBe('');
        })
      })
    })
  })

})
