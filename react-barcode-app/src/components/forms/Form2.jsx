import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginBottom: '1rem',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Shipment area</label>
        <input
          type="text"
          name="Shipmentarea"
          value={data.Shipmentarea || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.Shipmentarea && <div style={errorStyle}>{errors.Shipmentarea}</div>}
      </div>
      <div>
        <label>Area</label>
        <input
          type="text"
          name="Area"
          value={data.Area || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.Area && <div style={errorStyle}>{errors.Area}</div>}
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          name="City"
          value={data.City || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.City && <div style={errorStyle}>{errors.City}</div>}
      </div>
      <div>
        <label>State</label>
        <input
          type="text"
          name="field4"
          value={data.field4 || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.field4 && <div style={errorStyle}>{errors.field4}</div>}
      </div>
      <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Next
      </button>
    </form>
  );
};

export default Form2;
