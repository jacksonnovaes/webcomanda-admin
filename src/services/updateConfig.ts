import api from "./api";

export async function updateConfig(idEstab: string, appConfig: any) {
    
    const response = await api.put(`/api/v1/pdv/config/${idEstab}`, 
         appConfig,
           
     ) 
     return response
}