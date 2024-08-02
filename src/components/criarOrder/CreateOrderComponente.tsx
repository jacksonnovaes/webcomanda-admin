import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import Imenu from '../../interfaces/Imenu';
import FormLogin from '../../pages/Login/login';
import { getMenuByEstablishment } from '../../services/getMenuByEstablishiment';
import MenuProducts from '../menuProducts/menuProducts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Products = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Imenu[]>([]);
  const [idMenu, setIdMenu] = useState<number | undefined>(undefined);
  const [value, setValue] = React.useState(0);
  const token = localStorage.getItem('token');
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setIdMenu(1)
    const fetchMenu = async () => {
      
      try { 
     
        const response = await getMenuByEstablishment(token);
        setMenu(response);
        
      }catch (erro: any){
        if (erro.message === '403') {
          setError("Você não tem permissão para acessar esses pedidos.");
          console.log(erro  )
  
        }
      }
    };
    fetchMenu();
  }, [token]);  // Atualizado para [token] ao invés de [menu]

  if (!isLoggedIn || error === "Você não tem permissão para acessar esses pedidos." || error === "Você precisa estar logado para acessar os pedidos.") {
  
    return <FormLogin />;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTabClick = (id: number) => () => {
    setIdMenu(id);
  };



  return (
    <>
     {isLoggedIn ? (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {menu.map((men) => (
            <Tab
              key={men.id}
              label={men.name}
              onClick={handleTabClick(men.id)} />
          ))}
        </Tabs>
      </Box>

      <MenuProducts idMenu={idMenu} />

    </Box>
     ) : (
      <FormLogin/>
    )}
    </>
  );
};

export default Products;
