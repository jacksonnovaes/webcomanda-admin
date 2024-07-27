import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Imenu from '../../interfaces/Imenu';
import { getMenuByEstablishment } from '../../services/getMenuByEstablishiment';
import MenuProducts from '../menuProducts/menuProducts';
import Order from '../Order/order';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Products = () => {
  const [menu, setMenu] = useState<Imenu[]>([]);
  const [idMenu, setIdMenu] = useState<number | undefined>(undefined);
  const [value, setValue] = React.useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIdMenu(1)
    const fetchMenu = async () => {
      if (token) {
        const response = await getMenuByEstablishment(token);
        setMenu(response);
      }
    };
    fetchMenu();
  }, [token]);  // Atualizado para [token] ao invés de [menu]

 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTabClick = (id: number) => () => {
    setIdMenu(id);
  };



  return (
    <><Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {menu.map((men, index) => (
            <Tab
              key={men.id}
              label={men.name}
              onClick={handleTabClick(men.id)} />
          ))}
        </Tabs>
      </Box>

      <MenuProducts idMenu={idMenu} />

    </Box>
    </>
  );
};

export default Products;
