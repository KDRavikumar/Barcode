import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  position: relative;
  padding: 1rem;
`;

const ProgressList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* Ensure the list takes full width */
`;

const ProgressItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%; /* Ensure the line can span across */
  text-align: center;
  margin-bottom: 3rem; /* Space between items */
  
  /* Dot style */
  &:before {
    content: '';
    position: absolute;
    left: 50%; /* Center the dot */
    width: 1rem;
    height: 1rem;
    background: ${({ active }) => (active ? '#007bff' : '#ccc')};
    border-radius: 50%;
    border: 2px solid ${({ active }) => (active ? '#007bff' : '#ccc')};
    transform: translateX(-50%); /* Center dot horizontally */
    transition: background 0.3s ease, border 0.3s ease;
  }
  
  /* Line connecting dots */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 50%;
    width: 2px;
    height: 3rem; /* Adjust for space between dots */
    background: ${({ active }) => (active ? '#007bff' : '#ccc')};
    top: 100%; /* Position below the dot */
    transform: translateX(-50%); /* Center line horizontally */
    transition: background 0.3s ease;
  }
`;

const ProgressLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 1rem;
  background: ${({ active }) => (active ? '#007bff' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
  
  /* Adding scaling effect on hover */
  &:hover {
    transform: scale(1.05);
  }
`;

const ProgressTracker = ({ formData }) => {
  const forms = [
    { path: '/', name: 'Sender', filled: !!formData.form1 && Object.keys(formData.form1).length > 0 },
    { path: '/form2', name: 'Receiver', filled: !!formData.form2 && Object.keys(formData.form2).length > 0 },
    { path: '/form3', name: 'Shipment details', filled: !!formData.form3 && Object.keys(formData.form3).length > 0 },
    { path: '/form4', name: 'barcode', filled: !!formData.form4 && Object.keys(formData.form4).length > 0 },
  ];

  const currentPath = window.location.pathname;
  const currentIndex = forms.findIndex(form => form.path === currentPath);

  return (
    <ProgressContainer>
      <ProgressList>
        {forms.map((form, index) => (
          <ProgressItem
            key={index}
            active={index <= currentIndex}
          >
            <ProgressLink to={form.path} active={index <= currentIndex}>
              {form.name}
            </ProgressLink>
          </ProgressItem>
        ))}
      </ProgressList>
    </ProgressContainer>
  );
};

export default ProgressTracker;
