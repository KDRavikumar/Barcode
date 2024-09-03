import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Barcode from 'react-barcode';
import jsPDF from 'jspdf';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const BarcodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  background-color: ${props => props.primary ? '#008CBA' : '#4CAF50'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.primary ? '#007bb5' : '#45a049'};
  }
`;

const Form4 = ({ formData, setFormData }) => {
  const [data, setData] = useState(formData.Barcode || {});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, Barcode: data }));

    try {
      const response = await axios.post('http://localhost:5000/api/forms', {
        Sender: formData.Sender,
        Receiver: formData.Receiver,
        Shipment: formData.Shipment,
        Barcode: data,
      });

      console.log('Form data saved:', response.data);
      alert('Form data saved successfully');
      setFormData({});
      navigate('/'); // Redirect to the next route if needed
    } catch (error) {
      console.error('Error saving form data:', error);
      alert('Failed to save form data');
    }
  };

  const handleDownloadPNG = () => {
    const svg = document.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
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

  const handleDownloadPDF = () => {
    const svg = document.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(pngFile, 'PNG', 15, 40, 180, 160);
      pdf.save('barcode.pdf');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <BarcodeContainer>
        <Barcode value={formData} displayValue={false} />
        <Button type="button" onClick={handleDownloadPNG}>
          Download PNG
        </Button>
        <Button type="button" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </BarcodeContainer>
      <Button type="submit" primary>
        Save
      </Button>
    </FormContainer>
  );
};

export default Form4;
