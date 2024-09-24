import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, createTheme, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ImageAvatar from "../../components/Avatar/imageAvatare";
import { getEmailServ } from "../../services/getEmailService";
import { GetCongigApp } from "../../services/getConfigApp";
import { jwtDecode } from "jwt-decode";

const pages = [
  { id: 1, label: "Home", link: "/home" },
  {
    id: 2,
    label: "Vendas",
    link: "",
    sub: [
      { id: 1, label: "Novo Pedido", link: "/vendas" }
    ],
  },
  {
    id: 3,
    label: "Estoque",
    link: "",
    sub: [
      { id: 2, label: "Produtos", link: "/estoque" },
      { id: 3, label: "Categorias", link: "/gerenciar" }
    ],
  },
];

const profile = [
  { id: 1, label: 'Perfil', link: '/perfil' },
  { id: 2, label: 'Logout', link: '/login' }
];

const TopMenu = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElSubmenu, setAnchorElSubmenu] = useState<{ [key: string]: HTMLElement | null }>({});
  const [imageAvatar, setImageAvatar] = useState('');
  const token = localStorage.getItem('token');
  const establishment_name = localStorage.getItem('estab_name');

  const [config, setConfig] = useState<any>({})

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        if (token) {
          const decoded:any =  jwtDecode(token)
          const id = decoded.jti
          const response = await getEmailServ(token);
          setImageAvatar(response.urlImage);

          const configResult = await GetCongigApp(id)
          setConfig(configResult)
        } else {
        //  navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSubmenu = (event: React.MouseEvent<HTMLElement>, menuId: number) => {
    setAnchorElSubmenu((prev) => ({ ...prev, [menuId]: event.currentTarget }));
  };

  const handleCloseSubmenu = (menuId: number) => {
    setAnchorElSubmenu((prev) => ({ ...prev, [menuId]: null }));
  };


  return (
    
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'secondary',
                textDecoration: 'none',
              }}
            >
              <img src="./logo.png" alt="logo do app" style={{ marginRight: 10 }} />
              {establishment_name}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) =>
                  page.sub ? (
                    <React.Fragment key={page.id}>
                      <MenuItem
                        onClick={(event) => handleOpenSubmenu(event, page.id)}
                        onMouseEnter={(event) => handleOpenSubmenu(event, page.id)}
                      >
                        <Typography textAlign="center">
                          {page.label}
                        </Typography>
                      </MenuItem>
                      <Menu
                        anchorEl={anchorElSubmenu[page.id] || null}
                        open={Boolean(anchorElSubmenu[page.id])}
                        onClose={() => handleCloseSubmenu(page.id)}
                        MenuListProps={{ onMouseLeave: () => handleCloseSubmenu(page.id) }}
                      >
                        {page.sub.map((submenu) => (
                          <MenuItem
                            key={submenu.id}
                            component={Link}
                            to={submenu.link}
                            onClick={() => handleCloseSubmenu(page.id)}
                          >
                            {submenu.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </React.Fragment>
                  ) : (
                    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" component={Link} to={page.link}>
                        {page.label}
                      </Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src="./logo.png" alt="logo do app" style={{ marginRight: 10 }} />
              {establishment_name}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) =>
                page.sub ? (
                  <React.Fragment key={page.id}>
                    <Button
                      onClick={(event) => handleOpenSubmenu(event, page.id)}
                      onMouseEnter={(event) => handleOpenSubmenu(event, page.id)}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.label}
                    </Button>
                    <Menu
                      anchorEl={anchorElSubmenu[page.id] || null}
                      open={Boolean(anchorElSubmenu[page.id])}
                      onClose={() => handleCloseSubmenu(page.id)}
                      MenuListProps={{ onMouseLeave: () => handleCloseSubmenu(page.id) }}
                    >
                      {page.sub.map((submenu) => (
                        <MenuItem
                          key={submenu.id}
                          component={Link}
                          to={submenu.link}
                          onClick={() => handleCloseSubmenu(page.id)}
                        >
                          {submenu.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </React.Fragment>
                ) : (
                  <Button
                    key={page.id}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link}
                    to={page.link}
                  >
                    {page.label}
                  </Button>
                )
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Configurações de perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <ImageAvatar src={imageAvatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {profile.map((setting) => (
                  <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" component={Link} to={setting.link}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    
  );
};

export default TopMenu;
