import axios from "axios";


const httpClient = axios.create({
    baseURL: "https://projeto-integrador-4.herokuapp.com",
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
export const getAllUsers = () => {
  return httpClient.get("/users");
};

export const getUser = id => {
  return httpClient.get(`/users/${id}`);
};

export const postUser = data => {
  return httpClient.post("/users", data);
};

export const putUser = (id, data) => {
  return httpClient.put(`/users/${id}`, data);
};

export const deleteUser = id => {
  return httpClient.delete(`/users/${id}`);
};