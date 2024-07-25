import api from "./api";
import IItemOrder from "../interfaces/IItemOrder"

export async function addItem(orderId: number, itemOrders: IItemOrder[]) {
    const token = localStorage.getItem("token")
    const response = await api.put(`/api/v1/order/${orderId}/add/`, 
            itemOrders,
            {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
    )

    return response
}