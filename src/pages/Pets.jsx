import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deletePet, getPets } from "../api/pets";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Pets() {
  const [pets, setPets] = useState(null);

  function carregarPets() {
    getPets().then((dados) => {
      setPets(dados);
    });
  }

  function deletarPet(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deletePet(id).then((resposta) => {
        toast.success(resposta.message);
        carregarPets();
      })
    }
  }


  useEffect(() => {
    carregarPets();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Pets</h1>
      <hr />
      {pets ? (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Porte</th>
              <th>Data de Nascimento</th>
              <th>Proprietário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              return (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.tipo}</td>
                  <td>{pet.porte}</td>
                  <td>{pet.dataNasc}</td>
                  <td>{pet.cliente.nomeCliente}</td>
                  <td>
                    <ButtonGroup>
                      <Button variant="outline-dark" as={Link} to={`/pets/editar/${pet.id}`}>
                        <span className="material-symbols-outlined">edit</span></Button>
                      <Button variant="outline-danger"  onClick={() => deletarPet(pet.id)}>
                      <span className="material-symbols-outlined">delete</span></Button>
                  </ButtonGroup>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}

      <Button as={Link} variant="dark" to="/pets/novo">
        Adicionar Pet
      </Button>
      <hr />
    </main>
  );
}

export default Pets;
