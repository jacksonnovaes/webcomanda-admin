import Iproduto from "../interfaces/IProduto";
import api from "./api";


export async function updateProduct(product:Iproduto, id: number) {

    const token = localStorage.getItem('token');

    try{

        const response = await api.put(`/api/v1/product/pdv/edit/${id}`,
            product ,
            {
            
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                }
            })
        return response.data
    }catch(error: any){
        return error    
    }
}
