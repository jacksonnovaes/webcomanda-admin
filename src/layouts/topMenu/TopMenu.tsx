import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageAvatar from "../../components/Avatar/imageAvatare";
import { getEmailServ } from "../../services/getEmailService";


const pages = [
  {
    id: 1,
    label: 'Home',
    link: '/home',
  },
  {
    id: 3,

    label: 'vendas',
    link: '/vendas',
  }

];
const settings = [
  {
    id: 1,
    label: 'Perfil',
    link: '/perfil'
  },
  {
    id: 2,
    label: 'logout',
    link: '/login'
  },


];

const TopMenu = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [imageAvatar, setImageAvatar] = React.useState('');
  const token = localStorage.getItem('token');
  const establishment_name = localStorage.getItem('estab_name');
  const establishment_id = localStorage.getItem('estab_id');
  const navigate = useNavigate(); // Corrigido para useNavigate


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await getEmailServ(token);

          setImageAvatar(response.urlImage); // Assuming response contains the image data
        }else{
            navigate('/login')
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, [token]);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="./logo.png" alt="logo do app" />
            {establishment_name}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"
                    component={Link} to={setting.link}
                    sx={{
                      mr: 2,

                      flexGrow: 1,
                      fontFamily: 'sans-serif',
                      fontWeight: 700,
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img src="./logo.png" alt="logo do app" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            {establishment_name}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link} to={page.link}>
                {page.label}
              </Button>

            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ImageAvatar src={imageAvatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >


              {pages.map((setting) => (
                <MenuItem key={setting.id} 
                  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"
                    component={Link} to={setting.link}
                    sx={{
                      mr: 2,

                      flexGrow: 1,
                      fontFamily: 'sans-serif',
                      fontWeight: 700,
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default TopMenu