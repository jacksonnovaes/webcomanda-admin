import { jwtDecode } from "jwt-decode";
import { IPaginacao } from "../interfaces/Ipaginacao";
import Ipedidos from "../interfaces/Ipedidos";
import api from "./api";


export async function getEmailServ(token: any) {
    try {


        const decoded = jwtDecode(token)
        const id = decoded.jti

        const response = await api.get(`/api/v1/employee/user/${id}`,{
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