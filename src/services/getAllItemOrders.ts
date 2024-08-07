import api from "./api";

export async function getItemOrders(orderId: number, status:string) {
    const token = localStorage.getItem("token")
    const response = await api.get(`/api/v1/pdv/items/${orderId}/${status}`, 
            
            {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
    )

    return response.data
}