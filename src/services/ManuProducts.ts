import { jwtDecode } from "jwt-decode";
import api from "./api";
import { IPaginacao, IPaginacaoProduto } from "../interfaces/Ipaginacao";
import Iproduto from "../interfaces/IProduto";


export async function getProductsByMenu(currentPage: number,id: number) {
   
        const token = localStorage.getItem('token');
       
       
        try {
        const response = await api.get<IPaginacao<Iproduto>>(`/api/v1/product/pdv/menu/${id}/list`,{
            params: {
                page: currentPage,
                linesPerPage: 24,
                order: 'id',
                direction: 'DESC'
            },
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