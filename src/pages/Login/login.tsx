import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginTop from '../../layouts/LoginTop/loginTop';
import { fazerLogin } from '../../services/LoginService';
import './index.css';
import { getEstablishment } from '../../services/getEstablihsmente';
import { Alert, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { GetCongigApp } from '../../services/getConfigApp';
import { config } from 'process';
import { useAuth } from '../../AuthProvider';

const FormLogin = () => {

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [message, setMessage] = useState<string>('')

    const { login: authLogin } = useAuth();
    const navigate = useNavigate()

  
    const onSubmitForm = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        try{
        const resultado = await fazerLogin(login, pass)
       
        if (resultado){
            authLogin(resultado.tokenJwt);
            const establishmentResponse = await getEstablishment(resultado.tokenJwt)
            localStorage.setItem("estab_name",establishmentResponse.name)
            localStorage.setItem("estab_id",establishmentResponse.id)
            const configResult =  await GetCongigApp(establishmentResponse.id)
            if(configResult.firstLogin){
                navigate("/config")
            }else{
                navigate("/home")
            }
            
       }
           
        }catch(erro: any){
            
            setMessage("falha ao executar login!"+ erro)
        }
    }
    return (

        <div className='formLogin'>
            <LoginTop/>
            
            <form onSubmit={onSubmitForm}>
            {message && (
                    <Typography variant="body2" color="textSecondary" align="center">
                        <Alert severity="error">{message}</Alert>
                    </Typography>
                )}
                <div className='formGroup'>
                    <div className='input-field'>
                       
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            value={login}
                            onChange={evento => setLogin(evento.target.value)}
                            label="login" variant="outlined" />
                    </div>
                    <div className='input-field'>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            value={pass}
                            type='password'
                            onChange={evento => setPass(evento.target.value)}
                            label="password" variant="outlined" />
                    </div>
                    <div className='input-button'>
                    <Button type='submit' variant="contained">Login</Button>
                    <Button type='submit' variant="contained">Cadastrar</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default FormLogin
