import api from "./api";

export async function CloseOrderSer(orderId: number, paymentType: string, valueReceived: number) {
    const token = localStorage.getItem("token")
    console.log(valueReceived)
    const response = await api.put(`/api/v1/pdv/close/${orderId}`,
        { paymentType }, 
        {
            params:{
               valueReceived: `${valueReceived}`
            },
        
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`,
        }
        }
    )

    return response.data
}