import React, { useState } from "react";
import * as api from "../services/Endpoints"


export default function LoginControl(props) {
  const isLoggedIn = props.isLoggedIn
  const setIsLoggedIn = props.setIsLoggedIn

  const [dados, setDados] = useState({ usuario: "", senha: "" });

  const trataCampo = (event) => {
    const { name, value } = event.target;
    setDados({ ...dados, [name]: value });
  };

  const handleLoginClick = () => {
    api.login(dados)
      .then((resposta) => {
        console.log(resposta)
        sessionStorage.setItem("token", resposta.data.token)
        sessionStorage.setItem("user", resposta.data.email)
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err))
  }

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  }

  const LoginButton = () => {
    return (
      <div>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Usuário" onChange={trataCampo}
            id="usuario"
            required
            value={dados.usuario}
            name="usuario"
          />
          <input className="form-control me-2" type="search" placeholder="Senha" onChange={trataCampo}
            id="senha"
            required
            value={dados.senha}
            name="senha"
          />
          <button type="button" className="btn btn-dark" onClick={handleLoginClick}>Login</button>
        </form>
      </div>
    );
  }

  const LogoutButton = () => {
    return (
      <div className="d-flex align-items-center">
        <span>{sessionStorage.getItem("user")}</span>
        <button type="button" className="btn btn-dark" onClick={handleLogoutClick}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {isLoggedIn
        ? LogoutButton()
        : LoginButton()
      }
    </div>
  )
}

