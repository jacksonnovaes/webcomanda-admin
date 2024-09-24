import { IPaginacao } from "../interfaces/Ipaginacao";
import Iproduto from "../interfaces/IProduto";
import api from "./api";


export async function searchProducts(currentPage: number, name: string, idMenu: number) {

    const token = localStorage.getItem('token');

    
    try {
        const response = await api.get<IPaginacao<Iproduto>>(`/api/v1/product/pdv/menu/${name}/${idMenu}/list`, {
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