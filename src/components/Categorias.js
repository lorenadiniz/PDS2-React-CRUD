import { useState, Fragment, useEffect } from "react";
import * as api from "../services/Endpoints"

export default function Categorias() {
    const initialFormState = { id: null, name: '' }

    // Estado do componente
    const [categorias, setCategorias] = useState([])
    const [currentCategoria, setCurrentCategoria] = useState(initialFormState)
    const [editing, setEditing] = useState(false)

    useEffect(
        () => {
            api.buscaCategorias()
                .then((resposta) => {
                    console.log(resposta)
                    setCategorias(resposta.data)
                })
        },
        []
    )

    // CRUD operations
    const addUser = user => {
        user.id = categorias.length + 1
        setCategorias([...categorias, user])
    }

    const deleteUser = id => {
        setEditing(false)
        setCategorias(categorias.filter(user => user.id !== id))
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)
        setCategorias(categorias.map(user => (user.id === id ? updatedUser : user)))
    }

    const editRow = (categoria) => {
        setEditing(true)
        console.log(editing)
        setCurrentCategoria({ id: categoria.id, name: categoria.name })
        console.log(JSON.stringify(currentCategoria))
    }

    return (
        <div className="container px-0">
            <h1>Categorias</h1>
            <div className="row">
                <div className="col-6">
                    {editing ? (
                        <Fragment>
                            <h4>Alterar categoria</h4>
                            <EditUserForm
                                editing={editing}
                                setEditing={setEditing}
                                currentCategoria={currentCategoria}
                                updateUser={updateUser}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h4>Nova categoria</h4>
                            <AddUserForm addUser={addUser} />
                        </Fragment>
                    )}
                </div>
                <div className="col-6">
                    <UserTable categorias={categorias} editRow={editRow} deleteUser={deleteUser} />
                </div>
            </div>
        </div>
    )
}


const AddUserForm = props => {
    const initialFormState = { id: null, name: '', username: '' }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
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
            <input className="form-control mb-3" type="text" name="name" value={user.name} onChange={handleInputChange} />
            <button type="button" className="btn btn-primary me-1">Enviar</button>
        </form>
    )
}

const EditUserForm = props => {
    const [categoria, setCategoria] = useState(props.currentCategoria)

    useEffect(
        () => { setCategoria(props.currentCategoria) },
        [props]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {
        const { name, value } = event.target
        setCategoria({ ...categoria, [name]: value })
    }

    return (
        <div>
            <input className="form-control mb-3" type="text" name="name"
                value={categoria.name} onChange={handleInputChange} />
            <button type="button" className="btn btn-primary me-1"
                onClick={() => props.updateUser(categoria.id, categoria)}>
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
                <th scope="col">Categoria</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            {props.categorias.length > 0 ? (
                props.categorias.map(categoria => (
                    <tr key={categoria.id}>
                        <td className="w-100">{categoria.name}</td>
                        <td className="text-nowrap">
                            <button type="button"
                                onClick={() => { props.editRow(categoria) }}
                                className="btn btn-primary me-1 mb-1">
                                Editar
                            </button>
                            <button type="button"
                                onClick={() => props.deleteUser(categoria.id)}
                                className="btn btn-primary me-1 mb-1">
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No users</td>
                </tr>
            )}
        </tbody>
    </table>
)

