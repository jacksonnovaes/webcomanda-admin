import api from "./api";

export async function EditItem(id: number, quantity: number) {
    console.log(quantity)
    const token = localStorage.getItem("token")
    const response = await api.patch(`/api/v1/itemOrder/edit/${id}`,
        null,
            {
                params: { quantity },
                headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
            },
        }
        );

    return response.data
}