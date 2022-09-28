import React from 'react';
import ReactDOM  from 'react-dom';
import { screen, render } from '@testing-library/react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';

describe("Header", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
      <Header />
    </BrowserRouter>
    )
  })

  test('should show login link', () => {    
    expect(screen.getByRole('link', {
      name: /Login/i
    })).toBeInTheDocument();
  });

  test('should show Sign up link', () => {    
    expect(screen.getByRole('link', {
      name: /Sign Up/i
    })).toBeInTheDocument();
  });

})