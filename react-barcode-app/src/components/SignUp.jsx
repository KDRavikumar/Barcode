import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// Styled components
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  div {
    margin-bottom: 15px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

function SignUp() {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('User registered:', data.msg);
        navigate("login"); // Redirect to the login page upon successful sign-up
      } else {
        console.error('Sign-up failed:', data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  return (
    <Container>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
}

export default SignUp;
