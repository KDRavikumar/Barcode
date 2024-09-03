import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Form1 = ({ formData, setFormData }) => {
  const [data, setData] = useState(formData.Sender || {});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
  };

  const validate = () => {
    const newErrors = {};
    if (!data.ShipmentArea) newErrors.ShipmentArea = 'Shipment area is required';
    if (!data.Area) newErrors.Area = 'Area is required';
    if (!data.City) newErrors.City = 'City is required';
    if (!data.State) newErrors.State = 'State is required';
    if (!data.Pincode) newErrors.Pincode = 'Pincode is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setFormData((prev) => ({ ...prev, Sender: data }));
      navigate('/form2');
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
        <label>Shipment Area</label>
        <input
          type="text"
          name="ShipmentArea"
          value={data.ShipmentArea || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.ShipmentArea && <div style={errorStyle}>{errors.ShipmentArea}</div>}
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
          name="State"
          value={data.State || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.State && <div style={errorStyle}>{errors.State}</div>}
      </div>
      <div>
        <label>Pincode</label>
        <input
          type="text"
          name="Pincode"
          value={data.Pincode || ''}
          onChange={handleChange}
          style={inputStyle}
        />
        {errors.Pincode && <div style={errorStyle}>{errors.Pincode}</div>}
      </div>
      <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Next <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </form>
  );
};

export default Form1;
