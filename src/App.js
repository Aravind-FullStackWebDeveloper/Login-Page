import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

function App() {
  const initialValue = {
    username: "",
    password: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  const { username, email, password } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateError(formData));
    setSubmitForm(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && submitForm)
      console.log(formData);
  }, [formErrors]);

  const validateError = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email("This is not a valid email format");
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "This is not a valid password format";
    } else if (values.password.length > 10) {
      errors.password = "This is not a valid password format";
    }
    return errors;
  };
  return (
    <div className='container' variant='success'>
      {Object.keys(formErrors).length === 0 && submitForm ? (
        <div variant='success'>FormSubmitted</div>
      ) : (
        <pre>{JSON.stringify(formData, undefined, 2)}</pre>
      )}
      <br />
      <Form onSubmit={submitHandler}>
        <label>Registration form</label>
        <br />
        <br />
        <Form.Group className='mb-3' controlId='formUserName'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            onChange={changeHandler}
            placeholder='Enter Username'
          />
        </Form.Group>
        <p variant='danger'>{formErrors.username}</p>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            onChange={changeHandler}
            placeholder='Enter email'
          />
        </Form.Group>
        <p variant='danger'>{formErrors.email}</p>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={changeHandler}
            placeholder='Password'
          />
        </Form.Group>
        <p variant='danger'> {formErrors.password}</p>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
