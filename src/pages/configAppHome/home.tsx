import { Box, Checkbox, createTheme, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ThemeProvider } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import FormLogin from "../Login/login";
import { SketchPicker } from 'react-color';
import { updateConfig } from "../../services/updateConfig";


const HomeConfig = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { isLoggedIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<string>()
  const [appConfig, setAppConfig] = useState({
    primaryColor: '',
    secondaryColor: '',
    contrastPrimaryColor:'',
    contrastSecondaryColor:'',
    firstLogin: true,
    mode: 'light'
  });

  useEffect(() => {

  }, [navigate, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAppConfig(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const idEstab = localStorage.getItem("estab_id");
      if (idEstab) {
        await updateConfig(idEstab, appConfig);
        alert("Configurações salvas com sucesso!");
        navigate("/config")

      }
    } catch (error) {
      setError("Erro ao salvar configurações.");
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (color: any, name: string) => {
    setAppConfig(prevState => ({
      ...prevState,
      [name]: color.hex
    }));

  };


  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setAppConfig(prevState => ({
      ...prevState,
      mode: value
    }));
  };

  if (!isLoggedIn) {
    return <FormLogin />;
  }


  return (

    <Box sx={{
      width: "100", margin: 5, p: 5, border: '1px solid grey', borderRadius: 5,
      display: "flex"
    }}>
      <form onSubmit={handleSubmit} >
        <Box>
          <InputLabel id="demo-simple-select-label">Modo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={appConfig.mode}
            label="Modo"
            onChange={handleThemeChange}
          >
            <MenuItem value="light">Claro</MenuItem>
            <MenuItem value="dark">Escuro</MenuItem>
          </Select>
        </Box>

        <label>Cor Primária:</label>
        <SketchPicker
          color={appConfig.primaryColor}
          onChangeComplete={(color) => handleColorChange(color, 'primaryColor')}
        />
        <label>Cor do texto:</label>
        <SketchPicker
         color={appConfig.contrastPrimaryColor}
          onChangeComplete={(color) => handleColorChange(color, 'primaryColor')}
        />
        <div>
          <label>Cor Secundária:</label>
          <SketchPicker
            color={appConfig.secondaryColor}
            onChangeComplete={(color) => handleColorChange(color, 'secondaryColor')}
          />
          <label>Cor texto:</label>
          <SketchPicker
            color={appConfig.contrastSecondaryColor}
            onChangeComplete={(color) => handleColorChange(color, 'primaryColor')}
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              name="firstLogin"
              checked={appConfig.firstLogin}
              onChange={handleChange}
            />
          }
          label="Primeiro Acesso"
        />

        <Button type="submit" variant="contained" color="primary">
          Salvar Configurações
        </Button>
      </form>
    </Box>

  );
};

export default HomeConfig;
