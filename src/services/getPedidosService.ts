import { IPaginacao, IPaginacaoProduto } from "../interfaces/Ipaginacao";
import Ipedidos from "../interfaces/Ipedidos";
import api from "./api";

export async function getPedidosService(currentPage: number, token: string) {
    try {
        const response = await api.get<IPaginacao<Ipedidos>>('/api/v1/pdv/order/list', {
            params: {
                page: currentPage,
                linesPerPage: 24,
                order: 'id',
                direction: 'DESC'
            },
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}` // Certifique-se de adicionar 'Bearer' se necessário
            }
        });
       
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
