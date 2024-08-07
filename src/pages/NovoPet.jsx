import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getClientes } from "../api/clientes";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { addPet } from "../api/pets";

function NovoPet() {
  const [clientes, setClientes] = useState(null)

  useEffect(() => {
    getClientes().then((dados) => {
      setClientes(dados)
    })
  }, [])

  function salvarPet(data) {
    if (data.dataNasc == '') {
      data.dataNasc = null
    }
    addPet(data).then((response) => {
      toast.success(response.message)
      navigate("/pets")
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  return (
    <main className="mt-4 container">
      <h1>Novo pet</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarPet)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            id="tipo"
            className="form-control"
            {...register("tipo", { required: true, maxLength: 20 })}
          />
          {errors.tipo && (
            <small className="text-danger">O tipo é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="porte">Porte</label>
          <input
            type="text"
            id="porte"
            className="form-control"
            {...register("porte", { required: true, maxLength: 20 })}
          />
          {errors.porte && (
            <small className="text-danger">O porte é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="dataNasc">Data de Nascimento</label>
          <input
            type="date"
            id="dataNasc"
            className="form-control"
            {...register("dataNasc")}
          />
        </div>
        <div>
          <select id="clienteId" className="form-select mt-2" {...register("clienteId", { required: true, valueAsNumber: true })} aria-label="Default select example">
            <option value="">Selecione um cliente</option>
            {clientes && clientes.map((cliente) => {
              return (
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              )
            })}
          </select>
          {errors.clienteId && (
            <small className="text-danger">Selecione um cliente!</small>
          )}
        </div>
        <Button variant="dark" className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoPet;
