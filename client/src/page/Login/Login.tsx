import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

import classes from './Login.module.css';

function Login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [isRegistered, setIsRegistered] = useState(false);
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      familyEmail: '',
      familyPassword: ''
    }
  });

  useEffect(() => {
    console.log('location', location);
    console.log('queryParams', queryParams)
    if (queryParams.get('registered')) {
      setIsRegistered(true);
    }
  },[])

  const loginSubmitHandler = (data:any) => {
    console.log('login data', data);
  }
  
  const loginError = (err:any) => {
    console.log('err', err);    
  }

  const renderFieldError = (fieldName:string, defaultMessage: string, errorMessage:string|undefined) => {
    return (
      <Form.Text className={`${errorMessage? 'text-danger': 'text-muted'} `} data-testid={`${fieldName}-message`}>
        {errorMessage? errorMessage: defaultMessage}
      </Form.Text>
    )
  }

  const renderRegisterToast = () => {
    if (isRegistered) {
      return (
        <ToastContainer className="p-3" position='top-end'>
        <Toast bg="info" onClose={() =>setIsRegistered(false)} >
          <Toast.Header>
          <strong className="me-auto">Registered</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Family is now registered. Please login with your new credentials.
          </Toast.Body>
        </Toast>
      </ToastContainer>
      )
    }
  }

  return ( 
    <section className={classes['login-page']}>
      {renderRegisterToast()}
      <h1 className="display-3 text-center">Chore Tracker For The Family</h1>
      <Card className={`${classes['form-container']} mt-3`}>
        <Card.Header>
          <h3>Login with Family Credentials</h3>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(loginSubmitHandler, loginError)}>
            <Form.Group className="mb-3" controlId="familyEmail">
              <Form.Label>Family Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email"
                {...register(
                  'familyEmail', {
                    required: "Email is required",
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email"
                    }
                  })} 
              />
              {renderFieldError(
                'familyEmail',
                'The email is used as the entry point for the family',
                errors?.familyEmail?.message
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="familyPassword">
              <Form.Label>Family Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"
                {...register(
                  'familyPassword', {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: 'Password should be 6 or more characters'
                    }
              })} 
              />
              {renderFieldError(
                'familyPassword',
                'The password is used by family to gain access',
                errors?.familyPassword?.message
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
            Login
          </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
   );
}

export default Login;