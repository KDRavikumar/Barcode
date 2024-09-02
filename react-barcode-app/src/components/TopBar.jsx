import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopBarContainer = styled.div`
  width: 100%;
  background-color: #1e1e1e; /* Darker background */
  color: #f0f0f0; /* Light text color */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); /* Enhanced shadow */
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 1.25rem;
  margin-left: 1rem;
  cursor: pointer;
  color: #f0f0f0;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #007bff;
    transform: scale(1.1);
  }
`;

const SearchBar = styled.input`
  background: #f0f0f0; /* Light background */
  color: #333; /* Dark text */
  border: 1px solid #ccc; /* Light border */
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  margin: 0 1rem;
  width: 200px;
  font-size: 0.875rem;

  &::placeholder {
    color: #888; /* Placeholder color */
  }
`
const TopBar = () => {
  return (
    <TopBarContainer>
      <Logo>
        <Link to="/" style={{ color: '#f0f0f0', textDecoration: 'none' }}>LOGO</Link>
      </Logo>
      <ActionsContainer>
        <Icon>
          <i className="fas fa-bell"></i> {/* Notification icon */}
        </Icon>
        <SearchBar type="text" placeholder="Search..." />
        <Icon>
          <i className="fas fa-circle"></i> {/* Status icon */}
        </Icon>
        <Icon>
          <i className="fas fa-user-circle"></i> {/* Account circle */}
        </Icon>
      </ActionsContainer>
    </TopBarContainer>
  );
};

export default TopBar;
