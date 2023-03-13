import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';

const BottomBarNavigator: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleClick = (newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/chat');
        break;
      case 2:
        navigate('/about');
        break;
      case 3:
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation value={value} onChange={(event, newValue) => handleClick(newValue)} color = "secondary">
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
      <BottomNavigationAction label="Shippements" icon={<LocalShippingIcon />} />
      <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
    </BottomNavigation>
  );
};

export default BottomBarNavigator;
