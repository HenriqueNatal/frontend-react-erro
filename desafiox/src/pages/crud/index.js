import './index.css';
import crudService from '../../service/crud-service';
//hooks
import { useEffect, useState } from 'react'

import Cliente from '../../models/cliente'

function CRUD() {

    const [clientes, setClientes] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [cliente, setCliente] = useState(new Cliente());

    useEffect(() => {
        crudService.obter()
            .then(response => {
                setClientes(response.data);
            })
            .catch(erro => {
                console.log(erro)
            });
    }, []);

    const editar = (e) => {
        setModoEdicao(true);
        let clienteEncontrado = clientes.find(c => c.id == e.target.id);
        clienteEncontrado.dataCadastro = clienteEncontrado.dataCadastro.substring(0, 10);
        setCliente(clienteEncontrado);
    }

    const excluir = (e) => {
        let clienteEncontrado = clientes.find(c => c.id == e.target.id);
          
            excluirClienteBackend(clienteEncontrado.id);
        }

    const adicionar = () => {
        setModoEdicao(false);
    }

    const atualizarClienteNaTabela = (clienteAtualizado, removerCliente = false) => {
        let indice = clientes.findIndex((cliente) => cliente.id === clienteAtualizado.id);
        (removerCliente)
            ? clientes.splice(indice, 1,)
            : clientes.splice(indice, 1, cliente);
        setClientes(arr => [...arr]);
    }

    const salvar = () => {

    const adicionarClienteBackend = (cliente) => {
        crudService.adicionar(cliente)
            .then(response => {
                setClientes(lista => [...lista, new Cliente(response.data)]);
                limparCliente();
            })
            .catch(erro => {

            })
    }

    const atualizarClienteBackend = (cliente) => {
        crudService.atualizar(cliente)
            .then(response => {
                atualizarClienteNaTabela(response.data);
                limparCliente();
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Cliente atualizado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(erro => {

            })
    }

    const excluirClienteBackend = (id) => {
        crudService.excluir(id)
            .then(() => {
                let clienteEncontrado = clientes.find(c => c.id == id);
                atualizarClienteNaTabela(clienteEncontrado, true);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Cliente excluído com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch();
    }

    const limparCliente = () => {
        setCliente({
            ...cliente,
            id: '',
            nome: '',
            email: '',
            telefone: '',
            cpfOuCnpj: '',
            dataCadastro: ''
        });
    }

    return (

        <div className="container-fluid">

            {/*Titulo*/}
            <div className="row mt-3">
                <div className="col-sm-12">
                    <h4 id="titulo">Clientes</h4>
                    <hr />
                </div>
            </div>

            {/*Botão adicionar*/}
            <div className="row ">
                <div className="col-sm-3">
                    <button
                        id="btn-adicionar"
                        className="btn btn-primary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-cliente"
                        onClick={adicionar}>
                        Adicionar
                    </button>
                </div>
            </div>

            {/*Colunas*/}
            <div className="row mt-3">
                <div className="col-sm-12">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Cadastro</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpfOuCnpj}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{new Date(cliente.dataCadastro).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            id={cliente.id}
                                            onClick={editar}
                                            className="btn btn-outline-primary btn-sm espaco"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modal-cliente">
                                            Editar
                                        </button>
                                        <button
                                            id={cliente.id}
                                            onClick={excluir}
                                            className="btn btn-outline-primary btn-sm espaco">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/*Modal*/}
            <div className="row">
                {/* The Modal */}
                <div className="modal fade" id="modal-cliente">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">{modoEdicao ? "Editar cliente" : "Adicionar cliente"}</h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"></button>
                            </div>

                            {/* Modal body */}
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-2">
                                        <label for="id" className="form-label">Id</label>
                                        <input
                                            disabled type="text"
                                            className="form-control"
                                            id="id"
                                            value={cliente.id}
                                            onChange={(e) => setCliente({ ...cliente, id: e.target.value })}
                                        />
                                    </div>

                                    <div className="col-sm-10">
                                        <label for="nome" className="form-label">Nome</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nome"
                                            value={cliente.nome}
                                            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-sm-4">
                                        <label for="cpf" className="form-label">CPF</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cpf"
                                            value={cliente.cpfOuCnpj}
                                            onChange={(e) => setCliente({ ...cliente, cpfOuCnpj: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <label for="dataCadastro" className="form-label">Data de Cadastro</label>
                                        <input
                                            disabled type="date"
                                            className="form-control"
                                            id="dataCadastro"
                                            value={cliente.dataCadastro}
                                            onChange={(e) => setCliente({ ...cliente, dataCadastro: e.target.value })}
                                        />
                                    </div>

                                    <div className="col-sm-4">
                                        <label for="telefone" className="form-label">Telefone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telefone"
                                            value={cliente.telefone}
                                            onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                                        />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <label for="email" className="form-label">E-mail</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            placeholder='exemplo@email.com'
                                            value={cliente.email}
                                            onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button id="btn-salvar" className="btn btn-primary btn-sm" onClick={salvar}>Salvar</button>
                                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal" onClick={limparCliente}>Cancelar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CRUD; 

//fazer o modal fechar após salvar no modo editar. modalhide?
