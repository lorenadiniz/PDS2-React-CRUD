import React, { useState } from "react";
import * as api from "../services/Endpoints"

const NovoUsuario = () => {
    const estadoInicial = { email: '', id: null, name: '', phone: '', password: '' }
    const [usuario, setUsuario] = useState(estadoInicial);
    const [submitted, setSubmitted] = useState(false);

    const trataCampo = (event) => {
        const { name, value } = event.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const novo = () => {
        setUsuario(estadoInicial);
        setSubmitted(false);
    };

    const enviarRequisicao = () => {
        var data = {
            name: usuario.name,
            phone: usuario.phone,
            email: usuario.email,
            password: usuario.password
        };
        console.log(data)
        api.postUser(data)
            .then(response => {
                setUsuario({
                    id: response.data.id,
                    phone: response.data.phone,
                    email: response.data.email,
                    password: response.data.password
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div class="row">
            <div class="col-md-3">
            </div>
            <div class="col-md-6">
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>Usuário cadastrado com sucesso!</h4>
                            <button className="btn btn-primary" onClick={novo}>Novo</button>
                        </div>
                    ) : (
                        <div>
                        <center> <h3>Novo Usuário</h3></center>
                            <form>
        <br/><h5>E-mail</h5>
            <input className="form-control mb-3" type="text" name="name" value={usuario.name} />
            <h5>Senha</h5>
            <input className="form-control mb-3" type="password" name="password" value={usuario.password}  />
            <h5>Nome</h5>
            <input className="form-control mb-3" type="text" name="email" value={usuario.email}/>
            <h5>Telefone</h5>
            <input className="form-control mb-3" type="tel" name="phone" value={usuario.phone}  />
           
            <button onClick={enviarRequisicao} className="btn btn-primary mt-4">Enviar</button>
        </form>
                        </div>
                    )}
                </div>
            </div>
            <div class="col-md-3">
            </div>
        </div>
    );
}

export default NovoUsuario;