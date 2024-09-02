import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form3 = ({ formData, setFormData }) => {
  const [data, setData] = useState(formData.form3 || {});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
  };

  const validate = () => {
    const newErrors = {};
    if (!data.field1) newErrors.field1 = 'Order number is required';
    if (!data.field2) newErrors.field2 = 'Order details are required';
    if (!data.field3) newErrors.field3 = 'Prize is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setFormData((prev) => ({ ...prev, form3: data }));
      navigate('/form4');
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
        <label>Order Number</label>
        <input
          type="text"
          name="field1"
          value={data.field1 || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.field1 && <div style={errorStyle}>{errors.field1}</div>}
      </div>
      <div>
        <label>Order Details</label>
        <input
          type="text"
          name="field2"
          value={data.field2 || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.field2 && <div style={errorStyle}>{errors.field2}</div>}
      </div>
      <div>
        <label>Prize</label>
        <input
          type="text"
          name="field3"
          value={data.field3 || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.field3 && <div style={errorStyle}>{errors.field3}</div>}
      </div>
      <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Next
      </button>
    </form>
  );
};

export default Form3;
