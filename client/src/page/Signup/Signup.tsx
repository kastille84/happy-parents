import {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import authService from '../../util/service/auth';

import classes from './Signup.module.css';

function Signup() {
  const history = useHistory();
  const [serverError, setServerError] = useState(null);
  const {register, handleSubmit, getValues, formState: { errors }} = useForm({
    defaultValues: {
      parentName: '',
      familyEmail: '',
      familyPassword: '',
      confirmFamilyPassword: ''
    }
  });

  const signupSubmitHandler = (data: any) => {
    // reset serverError
    setServerError(null);
    // #TODO: loader started
    authService.register(data).then(res => {
      // #TODO: stop loader
      // redirect to login with toast success prompting to login with new credentials
      history.push('/login?registered=true');
    })
    .catch(err => {
      // #TODO: stop loader
      console.log('signup err', err)
      setServerError(err.message);
    })
  }

  const signupError = (err:any) => {
    console.log('err', err);
  }

  const renderFieldError = (fieldName:string, defaultMessage: string, errorMessage:string|undefined) => {
    return (
      <Form.Text className={`${errorMessage? 'text-danger': 'text-muted'} `} data-testid={`${fieldName}-message`}>
        {errorMessage? errorMessage: defaultMessage}
      </Form.Text>
    )
  }

  return ( 
    <section className={`${classes['signup-page']}`}>
      <h1 className="display-5 text-center">Sign Up Now</h1>
      <Card className={`${classes['form-container']} mt-3`}>
        <Card.Header>
          <h3>Register Your Family</h3>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(signupSubmitHandler, signupError)}>
            {serverError && <h6 className="text-danger">{serverError}</h6>}
            <Form.Group className="mb-3" controlId="parentName">
              <Form.Label>Parent Name</Form.Label>
              <Form.Control type="text" placeholder="Mom/Dad's name" 
                {...register(
                  'parentName', {
                    required: 'Parent name is required'
                  }
                )}
              />
              {renderFieldError(
                'parentName',
                '',
                errors?.parentName?.message
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="familyEmail">
              <Form.Label>Family Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" 
                {...register(
                  'familyEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email"                     
                    }
                  }
                )}
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
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password should be 6 or more characters'
                    }
                  }
                )}
              />
              {renderFieldError(
                'familyPassword',
                'The password is used by family to gain access',
                errors?.familyPassword?.message
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmFamilyPassword">
              <Form.Label>Confirm Family Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password to confirm" 
                {...register(
                  'confirmFamilyPassword', {
                    required: 'Password confirmation is required',
                    validate: {
                      sameAsPassword: (v) => {
                        return v === getValues('familyPassword') || 'Passwords must match';
                      }
                    }
                  }
                )}
              />
              {renderFieldError(
                'confirmFamilyPassword',
                '',
                errors?.confirmFamilyPassword?.message
              )}
            </Form.Group>
            <Button variant="success" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
   );
}

export default Signup;