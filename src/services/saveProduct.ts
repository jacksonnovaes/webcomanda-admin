import Iproduto from "../interfaces/IProduto";
import api from "./api";


export async function saveProduct(product:Iproduto, id: number) {

    const token = localStorage.getItem('token');

    try{

        const response = await api.post(`/api/v1/product/pdv/save/${id}`,
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
