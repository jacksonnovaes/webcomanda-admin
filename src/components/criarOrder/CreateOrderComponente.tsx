import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import FormLogin from '../../pages/Login/login';
import Menu from '../Menu/Menu';
import MenuProducts from '../menuProducts/menuProducts';

const CreateOrder = () => {
  const navigate = useNavigate();
  const [idMenu, setIdMenu] = useState<number | undefined>(undefined);
  const token = localStorage.getItem('token');
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    // Set a default menu ID, or fetch it dynamically
    setIdMenu(1);
  }, [token, navigate]);

  if (!isLoggedIn) {
    return <FormLogin />;
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Menu setIdMenu={setIdMenu} />
        <MenuProducts idMenu={idMenu} />
      </Box>
    </>
  );
};


export default CreateOrder;