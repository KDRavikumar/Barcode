import React from 'react';
import styled from 'styled-components';
import ProgressTracker from './ProgressTracker';
import TopBar from './TopBar';

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header header header"
    "left center right";
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background-color: #ee0808; /* Dark theme background */
`;

const Header = styled.header`
  grid-area: header;
  background: #f35f5f;
  padding: 1rem;
  text-align: center;
`;

const LeftSection = styled.aside`
  grid-area: left;
  background: #1e1e1e;
  padding: 1rem;
`;

const RightSection = styled.aside`
  grid-area: right;
  background: #1e1e1e;
  padding: 1rem;
`;

const CenterSection = styled.main`
  grid-area: center;
  background: #1e1e1e;
  padding: 1rem;
`;

// Styled components for navigation
const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 1rem 0;
  
  a {
    color: #f35f5f;
    text-decoration: none;
    font-size: 1.1rem;
    
    &:hover {
      color: #ffcc00;
    }
  }
`;

const Layout = ({ children, formData }) => {
  return (
    <Container>
      <Header>
        <TopBar />
      </Header>
      <LeftSection>
        <NavList>
          <NavItem><a href="/home">Home</a></NavItem>
          <NavItem><a href="/about">About</a></NavItem>
          <NavItem><a href="/contact">Contact</a></NavItem>
          {/* Add more NavItems as needed */}
        </NavList>
      </LeftSection>
      <RightSection>
        <ProgressTracker formData={formData} />
      </RightSection>
      <CenterSection>{children}</CenterSection>
    </Container>
  );
};

export default Layout;
