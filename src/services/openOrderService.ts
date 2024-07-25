import IItemOrder from "../interfaces/IItemOrder";
import api from "./api";

export async function openOrder(itemOrders: IItemOrder[]    ) {
    const token = localStorage.getItem("token")

    const response = await api.post('/api/v1/pdv/open/', 
     itemOrders , 
        {
        headers: {
            'accept': '*/*',
            'Authorization': `${token}`
        }
    }       
    )

    return response.data
}