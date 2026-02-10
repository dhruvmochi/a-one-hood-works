import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', address: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await axios.post('http://localhost:5000/api/register', formData);
        alert('Registered successfully! Login now.');
        setIsRegister(false);
      } else {
        const res = await axios.post('http://localhost:5000/api/login', { email: formData.email, password: formData.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/profile');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  };

  return (
    <Container className="my-5">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <Form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control name="mobile" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control name="address" onChange={handleChange} required />
            </Form.Group>
          </>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">{isRegister ? 'Register' : 'Login'}</Button>
      </Form>
      <Button variant="link" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have account? Login' : 'New user? Register'}
      </Button>
    </Container>
  );
};

export default Login;