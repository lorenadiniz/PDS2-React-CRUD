import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"

const EditaUsuario = props => {
    const estadoInicial = { email: '', id: null, name: '', phone: '' }

    const [usuario, setUsuario] = useState(estadoInicial);
    const [message, setMessage] = useState("");

    const getUsuario = (id) => {
        api.getUser(id)
            .then(response => {
                setUsuario(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(
        () => { getUsuario(props.match.params.id); },
        [props.match.params.id]
    );

    const trataCampo = event => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const atualizarUsuario = () => {
        api.putUser(usuario.id, usuario)
            .then(response => {
                console.log(response.data);
                setMessage("Usuário atualizada!");
            })
            .catch(e => { console.log(e); });
    };

    const excluirUsuario = () => {
        api.deleteUser(usuario.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/usuarios");
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div>
            <div class="row">
                <div class="col-md-3">
                </div>
                <div class="col-md-6">
                    {usuario ? (
                        <div className="edit-form">
                            <h4>Usuário</h4>
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={usuario.name}
                                        onChange={trataCampo}
                                    />
                                </div>
                            </form>

                            <button className="btn btn-danger danger mt-3" onClick={excluirUsuario}>Excluir</button>
                            <button type="submit" className="btn btn-primary mt-3 mx-3" onClick={atualizarUsuario}>
                                Atualizar
                            </button>
                            <p>{message}</p>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Selecione um usuário.</p>
                        </div>
                    )}
                </div>
                <div class="col-md-3">
                </div>
            </div>
        </div>
    );
};

export default EditaUsuario;