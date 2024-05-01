import Ipedidos from "./Ipedidos";

export interface IPaginacao<T> {
    content: Ipedidos[];
    pageable: {
      pageNumber: number;
      pageSize: number;
    };
    totalPages: number;
    totalElements: number;
}
