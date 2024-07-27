import api from "./api";

export async function GetOrder(orderId: number   ) {
    const token = localStorage.getItem("token")

    const response = await api.get(`/api/v1/pdv/open/${orderId}`, 
     
        {
        headers: {
            'accept': '*/*',
            'Authorization': `${token}`
        }
    }       
    )

    return response.data
}