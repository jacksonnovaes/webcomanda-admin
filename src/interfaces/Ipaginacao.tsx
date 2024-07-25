import Ipedidos from "./Ipedidos";
import Iproduto from "./IProduto";

export interface IPaginacao<T> {
    content: T[];
    pageable: {
      pageNumber: number;
      pageSize: number;
    };
    totalPages: number;
    totalElements: number;
}
export type IpaginacaoPedidos = IPaginacao<Ipedidos>;
export type IPaginacaoProduto = IPaginacao<Iproduto>;