import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"
import { Link } from "react-router-dom";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        buscaUsuarios();
    }, []);

    const buscaUsuarios = () => {
        api.getAllUsers()
            .then(response => {
                setUsuarios(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setUsuario = (usuario, index) => {
        setUsuarioSelecionado(usuario);
        setCurrentIndex(index);
    };

    return (
        <div className="container list row">
            <div className="col-md-6">
                <h4>Usuários</h4>
                <Link to="/novoUsuario" className="btn btn-warning">
              Criar novo Usuário
            </Link>
                <ul className="list-group py-1">
                    {usuarios &&
                        usuarios.map((usuario, index) => (
                            <li  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                 onClick={() => setUsuario(usuario, index)}
                                 key={index}
                            >{usuario.name}</li>
                        ))}
                </ul>
            </div>


            <div className="col-md-6">
                {usuarioSelecionado ? (
                    <div>
                        <h4>Detalhe</h4>
                        <div>
                            <label>
                                <strong>Usuário:</strong>
                            </label>{" "}
                            {usuarioSelecionado.name}
                        </div>

                        <Link to={"/editaUsuario/" + usuarioSelecionado.id} className="btn btn-warning">Editar</Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Selecione um usuário.</p>
            

                    </div>
                )}
            </div>
        </div>
    );
};

export default Usuarios;