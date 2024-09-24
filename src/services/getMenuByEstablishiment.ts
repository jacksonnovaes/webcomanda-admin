import { jwtDecode } from "jwt-decode";
import api from "./api";


export async function getMenuByEstablishment(token: any, estab_id: any) {
    try {
      
        
        console.log(estab_id)
        const response = await api.get(`/api/v1/menu/list/${estab_id}`,{

            headers: {
                'accept': '*/*',
                'Authorization': `${token}`
            }

        })
        return response.data;
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 403) {
                throw new Error('403');
            }
            console.error("Erro na resposta do servidor:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Nenhuma resposta recebida:", error.request);
        } else {
            console.error("Erro ao configurar a requisição:", error.message);
        }
        throw error;
    }
}