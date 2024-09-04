import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for responsive design
const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }

  label {
    display: block;
    margin-bottom: 0.75rem;
    color: #333; /* Color for labels */
    font-size: 1.1rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  color: #333; /* Color for input text */
  background-color: #fff; /* Background color for input */

  @media (max-width: 1024px) {
    padding: 0.9rem;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background-color: #007bff;
  color: #fff; /* Color for button text */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0.55rem 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }
`;

// Main Form2 component
const Form2 = ({ formData, setFormData }) => {
  const [data, setData] = useState(formData.Receiver || {});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
  };

  const validate = () => {
    const newErrors = {};
    if (!data.Shipmentarea) newErrors.Shipmentarea = 'Shipment area is required';
    if (!data.Area) newErrors.Area = 'Area is required';
    if (!data.City) newErrors.City = 'City is required';
    if (!data.field4) newErrors.field4 = 'State is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setFormData((prev) => ({ ...prev, Receiver: data }));
      navigate('/form3');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Shipmentarea">Shipment Area</label>
        <Input
          type="text"
          id="Shipmentarea"
          name="Shipmentarea"
          value={data.Shipmentarea || ''}
          onChange={handleChange}
        />
        {errors.Shipmentarea && <ErrorText>{errors.Shipmentarea}</ErrorText>}
      </div>
      <div>
        <label htmlFor="Area">Area</label>
        <Input
          type="text"
          id="Area"
          name="Area"
          value={data.Area || ''}
          onChange={handleChange}
        />
        {errors.Area && <ErrorText>{errors.Area}</ErrorText>}
      </div>
      <div>
        <label htmlFor="City">City</label>
        <Input
          type="text"
          id="City"
          name="City"
          value={data.City || ''}
          onChange={handleChange}
        />
        {errors.City && <ErrorText>{errors.City}</ErrorText>}
      </div>
      <div>
        <label htmlFor="field4">State</label>
        <Input
          type="text"
          id="field4"
          name="field4"
          value={data.field4 || ''}
          onChange={handleChange}
        />
        {errors.field4 && <ErrorText>{errors.field4}</ErrorText>}
      </div>
      <Button type="submit">
        Next
      </Button>
    </FormContainer>
  );
};

export default Form2;
