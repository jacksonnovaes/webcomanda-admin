import api from "./api";

export async function CloseOrderSer(orderId: number, paymentType: string) {
    const token = localStorage.getItem("token")

    const response = await api.put(`/api/v1/pdv/close/${orderId}`,
        { paymentType }, 
        {
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`,
        }
    }
    )

    return response.data
}