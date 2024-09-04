import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Form1 from './components/forms/Form1';
import Form2 from './components/forms/Form2';
import Form3 from './components/forms/Form3';
import Form4 from './components/forms/Form4';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    Sender: {},
    Receiver: {},
    shipment: {},
    Barcode: {},
  });

  const [authData, setAuthData] = useState(null);

  return (
    <Router>
      <Layout formData={formData}>
        <Routes>
          <Route path="/form1" element={<Form1 formData={formData} setFormData={setFormData} />} />
          <Route path="/form2" element={<Form2 formData={formData} setFormData={setFormData} />} />
          <Route path="/form3" element={<Form3 formData={formData} setFormData={setFormData} />} />
          <Route path="/form4" element={<Form4 formData={formData} setFormData={setFormData} />} />
          <Route path="/login" element={<Login setAuthData={setAuthData} />} />
          <Route path="/" element={<SignUp setAuthData={setAuthData} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
