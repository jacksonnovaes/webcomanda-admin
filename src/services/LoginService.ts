import api from "./api"

export async function fazerLogin(login: string, password: string) {
    localStorage.removeItem("token")

    const respoose = await api.post("/login",
        {
            login: login,
            pass: password
        }
    )
    return respoose.data
       
}
