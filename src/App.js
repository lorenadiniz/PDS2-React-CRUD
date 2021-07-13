import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginControl from "./components/LoginControl.js"
import Home from "./components/Home"
import Categorias from "./components/Categorias.js"
//NOVO
import Usuarios from "./components/Usuarios";
import NovoUsuario from "./components/NovoUsuario";
import EditaUsuario from "./components/EditaUsuario";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <nav className="container navbar navbar-expand navbar-dark bg-dark">
        <h1 className="navbar-brand my-auto">
          Sistema e-commerce
        </h1>
        <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/categorias" className="nav-link">
              Categorias
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/usuarios" className="nav-link">
              Usuários
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </div>
        <div className="text-white">
          <LoginControl isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </nav>

      <div className="container mt-3 px-0">
        <Switch>
          <Route path="/categorias" component={Categorias} />
          <Route exact path={["/usuarios"]} component={Usuarios} />
          <Route exact path="/novoUsuario" component={NovoUsuario} />
          <Route exact path="/editaUsuario/:id" component={EditaUsuario} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;