import { error } from "console"
import api from "./api"

export default function fazerLogin(login: string, pass: string){
    localStorage.removeItem("token")
    const onSubmitForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        api.post("/login",
            {
                login: login,
                pass: pass
            }
        )
            .then(response => {
                return response.data.tokenJwt
               
            }).catch(error=>{
                console.log(error)
            }
        )}
}