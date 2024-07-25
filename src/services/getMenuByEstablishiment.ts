import { jwtDecode } from "jwt-decode";
import api from "./api";


export async function getMenuByEstablishment(token: any) {
    try {


        const decoded = jwtDecode(token)
        const id = decoded.jti

        const response = await api.get(`/api/v1/menu/list/${id}`,{

            headers: {
                'accept': '*/*',
                'Authorization': `${token}`
            }

        })
        return response.data;
    } catch (error) {
        return null;
    }
}