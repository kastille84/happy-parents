import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import Login from '../Login';

describe('Login', () => {
  beforeEach(() => {
    render(<BrowserRouter>
      <Login />
    </BrowserRouter>)
  })

  describe('Render', () => {
    it('should render Login Page', () => {
      expect(screen.getByRole('heading', {
        name: 'Login with Family Credentials'
      })).toBeInTheDocument();
    })
  
    it('should render the login form', () => {
      expect(screen.getByLabelText('Family Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Family Password')).toBeInTheDocument();
      expect(screen.getByRole('button', {
        name: 'Login'
      })).toBeInTheDocument();
    })
  })


  describe('Form', () => {
    let familyEmailInput, familyPasswordInput, formButton;
    beforeEach(() => {
      familyEmailInput = screen.getByLabelText('Family Email');
      familyPasswordInput = screen.getByLabelText('Family Password');
      formButton = screen.getByRole('button', {name: 'Login'});
    })

    describe('Errors', () => {
      it('should show error message if family email is empty', async() => {
        userEvent.click(formButton);
        await waitFor(() => 
          expect(screen.getByTestId('familyEmail-message').textContent).toBe('Email is required'));
      });
    
      it('should show error message if family email is not correct format', async () => {
        userEvent.type(familyEmailInput, 'edMar');
        userEvent.click(formButton);
        await waitFor(() => 
          expect(screen.getByTestId("familyEmail-message").textContent).toBe("Please enter a valid email"));
      });
  
      it('should show error message if family password is empty', async () => {
        userEvent.click(formButton);
        await waitFor(() => 
          expect(screen.getByTestId('familyPassword-message').textContent).toBe('Password is required'));
      });
      it('should show error message if family password is less than 6 chars', async () => {
        userEvent.type(familyPasswordInput, '1234');
        userEvent.click(formButton);
        await waitFor(() =>
          expect(screen.getByTestId('familyPassword-message').textContent).toBe('Password should be 6 or more characters'))
      });

      it('should NOT show error messages if family email and password are correct', async () => {
        userEvent.type(familyEmailInput, 'edMar@gmail.com');
        userEvent.type(familyPasswordInput, 'test1234');
        userEvent.click(formButton);
        await waitFor(() => {
          expect(screen.getByTestId("familyEmail-message").textContent).toBe("The email is used as the entry point for the family");
          expect(screen.getByTestId('familyPassword-message').textContent).toBe('The password is used by family to gain access');
        })
      })
    })

  })
})