import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Barcode from 'react-barcode';

const Form4 = ({ formData, setFormData }) => {
  const [data, setData] = useState(formData.form4 || {});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, form4: data }));

    try {
      const response = await axios.post('http://localhost:5000/api/forms', {
        form1: formData.form1,
        form2: formData.form2,
        form3: formData.form3,
        form4: data,
      });

      console.log('Form data saved:', response.data);
      alert('Form data saved successfully');
      setFormData({})
      navigate('/'); // Redirect to the next route if needed
    } catch (error) {
      console.error('Error saving form data:', error);
      alert('Failed to save form data');
    }
  };

  const handleDownload = () => {
    const svg = document.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'barcode.png';
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Barcode</label>
        <input
          type="text"
          name="field1"
          value={data.field1 || ''}
          onChange={handleChange}
        />
      </div>

      {data.field1 && (
        <div>
          <Barcode value={data.field1} />
          <button type="button" onClick={handleDownload}>
            Download Barcode
          </button>
        </div>
      )}

      <button type="submit">Save</button>
    </form>
  );
};

export default Form4;
