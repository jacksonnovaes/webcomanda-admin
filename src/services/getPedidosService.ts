import { IPaginacao, IPaginacaoProduto } from "../interfaces/Ipaginacao";
import Ipedidos from "../interfaces/Ipedidos";
import api from "./api";


export async function getPedidosService(currentPage: number, token: string) {
    try {

        const response = await api.get<IPaginacao<Ipedidos>>('/api/v1/order/list', {
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
        });
        return response.data;
    } catch (error) {
        return null;
    }
}