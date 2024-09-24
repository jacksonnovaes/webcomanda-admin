import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import FormLogin from './pages/Login/login';

import { jwtDecode } from 'jwt-decode';
import HomeConfig from './pages/configAppHome/home';
import Home from './pages/Home/home';
import OpenOrders from './pages/order.tsx/openOrder';
import Products from './pages/Products/product';
import { GetCongigApp } from './services/getConfigApp';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [themeConfig, setThemeConfig] = useState({
    primaryColor: '#d2192b',
    secondaryColor: '#19857b',
    contrastPrimaryColor:'',
    contrastSecondaryColor:'',
    mode: 'dark',
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchThemeConfig = async () => {
    
      try {
        const decoded:any =  jwtDecode(token)
        const id = decoded.jti
        const response = await GetCongigApp(id)
     
        
        setThemeConfig(response);
      } catch (error) {
        console.error('Erro ao buscar configurações do tema:', error);
      }
    };

    fetchThemeConfig();
  }, []);
  const theme = createTheme({

    palette: {
      mode: themeConfig.mode === 'dark' ? 'dark' : 'light', 
      primary: {
        main: themeConfig.primaryColor || '#d2192b',
        contrastText:themeConfig.contrastPrimaryColor
      },
      secondary: {
        main: themeConfig.secondaryColor || '#19857b',
        contrastText: themeConfig.contrastSecondaryColor
      }
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<FormLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vendas" element={<OpenOrders />} />
        <Route path="/estoque" element={<Products />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/config" element={<HomeConfig />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
