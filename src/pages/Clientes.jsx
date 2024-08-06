import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getClientes } from "../api/clientes";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"

function Clientes() {
  const [clientes, setClientes] = useState(null)

  function carregarClientes() {
    getClientes().then((dados) => {
      setClientes(dados)
    })
  }

  useEffect(() => {
    carregarClientes()
  }, [])

  return (
    <main className="mt-4 container">
      <h1>Clientes</h1>
      <Button variant="dark" as={Link} to="/clientes/novo">
        Adicionar Cliente
      </Button>
      <hr />
      {clientes ? <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => {
            return (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <ButtonGroup>
                  <Button variant="outline-dark"><span className="material-symbols-outlined">edit</span></Button>
                  <Button variant="outline-danger"><span className="material-symbols-outlined">delete</span></Button>
                </ButtonGroup>
              </td>
            </tr>
            )
          })}
        </tbody>
      </Table>     
      : <Loader/>}
    </main>
  );
}

export default Clientes;
