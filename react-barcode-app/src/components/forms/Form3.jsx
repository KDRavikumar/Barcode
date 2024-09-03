import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form3 = ({ formData, setFormData }) => {
  const [data, setData] = useState(formData.Shipment || {});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
  };

  const validate = () => {
    const newErrors = {};
    if (!data.Ordernumber) newErrors.Ordernumber = 'Order number is required';
    if (!data.Orderdetails) newErrors.Orderdetails = 'Order details are required';
    if (!data.Prize) newErrors.Prize = 'Prize is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setFormData((prev) => ({ ...prev, Shipment: data }));
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
          name="Ordernumber"
          value={data.Ordernumber || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.Ordernumber && <div style={errorStyle}>{errors.Ordernumber}</div>}
      </div>
      <div>
        <label>Order Details</label>
        <input
          type="text"
          name="Orderdetails"
          value={data.Orderdetails || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.Orderdetails && <div style={errorStyle}>{errors.Orderdetails}</div>}
      </div>
      <div>
        <label>Prize</label>
        <input
          type="text"
          name="Prize"
          value={data.Prize || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.Prize && <div style={errorStyle}>{errors.Prize}</div>}
      </div>
      <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Next
      </button>
    </form>
  );
};

export default Form3;
