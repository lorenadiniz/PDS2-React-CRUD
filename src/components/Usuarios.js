import { useState, Fragment, useEffect } from "react";
import * as api from "../services/Endpoints"

export default function Usuarios() {
    const initialFormState = { email: '', id: null, name: '', phone: '' }

    // Estado do componente
    const [usuarios, setUsuarios] = useState([])
    const [currentUsuario, setCurrentUsuario] = useState(initialFormState)
    const [editing, setEditing] = useState(false)

    useEffect(
        () => {
            api.buscaUsuarios()
                .then((resposta) => {
                    console.log(resposta)
                    setUsuarios(resposta.data)
                })
        },
        []
    )

    // CRUD operations
    const addUser = user => {
        user.id = usuarios.length + 1
        setUsuarios([...Usuarios, user])
    }

    const deleteUser = id => {
        setEditing(false)
        setUsuarios(usuarios.filter(user => user.id !== id))
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)
        setUsuarios(usuarios.map(user => (user.id === id ? updatedUser : user)))
    }

    const editRow = (usuario) => {
        setEditing(true)
        console.log(editing)
        setCurrentUsuario({ id: usuario.id, name: usuario.name })
        console.log(JSON.stringify(currentUsuario))
    }

    return (
        <div className="container px-0">
            <h1>Usuários</h1>
            <div className="row">
                <div className="col-6">
                    {editing ? (
                        <Fragment>
                            <h4>Alterar usuário</h4>
                            <EditUserForm
                                editing={editing}
                                setEditing={setEditing}
                                currentUsuario={currentUsuario}
                                updateUser={updateUser}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h4>Novo usuário</h4>
                            <AddUserForm addUser={addUser} />
                           
                        </Fragment>
                    )}
                </div>
                <div className="col-6">
                    <UserTable usuarios={usuarios} editRow={editRow} deleteUser={deleteUser} />
                </div>
            </div>
        </div>
    )
}


const AddUserForm = props => {


    const initialFormState = { email: '', id: null, name: '', phone: '' }
    const [user, setUser] = useState(initialFormState)
   
    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
        console.log(user);
    }

    
    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                if (!user.name || !user.username) return

                props.addUser(user)
                setUser(initialFormState)
            }}
        >
        <br/><h5>E-mail</h5>
            <input className="form-control mb-3" type="text" name="name" value={user.name} onChange={handleInputChange} />
            <h5>Nome</h5>
            <input className="form-control mb-3" type="text" name="email" value={user.email} onChange={handleInputChange} />
            <h5>Telefone</h5>
            <input className="form-control mb-3" type="tel" name="phone" value={user.phone} onChange={handleInputChange} />
           
            <button type="button" className="btn btn-primary me-1">Enviar</button>
        </form>
    )
   
   
}

const EditUserForm = props => {
    const [usuario, setUsuario] = useState(props.currentUsuario)

    useEffect(
        () => { setUsuario(props.currentUsuario) },
        [props]
    )

    const handleInputChange = event => {
        const { name, value } = event.target
        setUsuario({ ...usuario, [name]: value })
    }

    return (
        <div>
            <input className="form-control mb-3" type="text" name="name"
                value={usuario.name} onChange={handleInputChange} />
            <button type="button" className="btn btn-primary me-1"
                onClick={() => props.updateUser(usuario.id, usuario)}>
                Atualizar
            </button>
            <button type="button" className="btn btn-primary me-1" onClick={() => props.setEditing(false)}>
                Cancelar
            </button>
        </div>
    )
}

const UserTable = props => (
    <table className="table table-responsive table-striped">
        <thead>
            <tr>
                <th scope="col">Usuário</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            {props.usuarios.length > 0 ? (
                props.usuarios.map(usuario => (
                    <tr key={usuario.id}>
                        <td className="w-100">{usuario.name}</td>
                        <td className="text-nowrap">
                            <button type="button"
                                onClick={() => { props.editRow(usuario) }}
                                className="btn btn-primary me-1 mb-1">
                                Editar
                            </button>
                            <button type="button"
                                onClick={() => props.deleteUser(usuario.id)}
                                className="btn btn-primary me-1 mb-1">
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>Sem usuários</td>
                </tr>
            )}
        </tbody>
    </table>
)

