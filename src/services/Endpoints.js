import axios from "axios";


const httpClient = axios.create({
    baseURL: "https://projeto-integrador-4.herokuapp.com",
    //baseURL: "http://localhost",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
    }
})

export const login = (dados) => {
    return httpClient.post("/auth/login", { "email": dados.usuario, "password": dados.senha })
}

export const buscaCategorias = () => {
    return httpClient.get("/categories")
}

//NOVO
export const buscaUsuarios = () => {
    return httpClient.get("/users")
}