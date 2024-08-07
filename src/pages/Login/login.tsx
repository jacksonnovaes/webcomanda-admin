import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginTop from '../../layouts/LoginTop/loginTop';
import { fazerLogin } from '../../services/LoginService';
import './index.css';
import { getEstablishment } from '../../services/getEstablihsmente';
import { Alert, Typography } from '@mui/material';

const FormLogin = () => {

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [message, setMessage] = useState<string>('');


    const navigate = useNavigate()

    localStorage.removeItem("token")
    const onSubmitForm = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        try{
        const resultado = await fazerLogin(login, pass)
       
        if (resultado){
            localStorage.setItem("token", resultado.tokenJwt)
            const establishmentResponse = await getEstablishment(resultado.tokenJwt)
            localStorage.setItem("estab_name",establishmentResponse.name)
            localStorage.setItem("estab_id",establishmentResponse.id)
            navigate("/home")
        }
            
        }catch(erro){
            setMessage("falha ao executar login!")
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