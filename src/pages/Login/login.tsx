import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './index.css'
import LoginTop from '../../layouts/LoginTop/loginTop';

const FormLogin = () => {

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    const navigate = useNavigate()

    localStorage.removeItem("token")
    const onSubmitForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        axios.post("http://localhost:8080/login",
            {
                login: login,
                pass: pass
            }
        )
            .then(response => {
                console.log(response.data.tokenJwt)
               
                localStorage.setItem("token",response.data.tokenJwt)
                navigate("/home")
            }).catch(error => {
                alert("algo deu errado!")
            })

    }
    return (

        <div className='formLogin'>
            <LoginTop/>
            <form onSubmit={onSubmitForm}>
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