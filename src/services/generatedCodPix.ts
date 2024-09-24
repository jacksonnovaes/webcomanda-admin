import IPagamentoPix from "../interfaces/RequstCobranca";
import api from "./api";

export async function GetResponsePaymentPix(pagamento: IPagamentoPix){
    try {
        
        const response = await api.post(`/v2/cob/pix`,
                pagamento  
        )
        console.log(response.data)
        return response.data;
    } catch (error: any) {

        if (error.response) {

            if (error.response.status === 403) {

                throw new Error('403');
            }
            console.error("Erro na resposta do servidor:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Nenhuma resposta recebida:", error.request);
        } else {
            console.error("Erro ao configurar a requisição:", error.message);
        }
        throw error;
    }
}