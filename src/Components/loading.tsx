import React from 'react';
import '../CSS/loading.css';
import logo from '../Assets/Images/logo_green.png';

const LogoPage: React.FC = () => {
  return (
    <div className="logo-page">
      <img src={logo} alt="App Logo" className="app-logo" />
    </div>
  );
};

export default LogoPage;
