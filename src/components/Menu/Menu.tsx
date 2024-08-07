import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMenuByEstablishment } from '../../services/getMenuByEstablishiment';
import FormLogin from '../../pages/Login/login';
import { useAuth } from '../../AuthProvider';
import Imenu from '../../interfaces/Imenu';

interface MenuProps {
  setIdMenu: (id: number) => void;
}

const Menu = ({ setIdMenu }: MenuProps ) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Imenu[]>([]);
  const [value, setValue] = useState(0);
  const token = localStorage.getItem('token');
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchMenu = async () => {
      try {
        const response = await getMenuByEstablishment(token);
        setMenu(response);
        if (response.length > 0) {
            setIdMenu(response[0].id); // Set initial idMenu
          }
      } catch (erro: any) {
        if (erro.message === '403') {
          setError("Você não tem permissão para acessar esses pedidos.");
          console.log(erro);
        }
      }
    };
    fetchMenu();
  }, [token, navigate, setIdMenu]);

  if (!isLoggedIn || error === "Você não tem permissão para acessar esses pedidos." || error === "Você precisa estar logado para acessar os pedidos.") {
    return <FormLogin />;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setIdMenu(menu[newValue].id);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {menu.map((men) => (
            <Tab key={men.id} label={men.name} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default Menu;
