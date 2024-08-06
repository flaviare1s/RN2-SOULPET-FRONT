/* eslint-disable no-undef */
// Esse arquivo possui funções para realizar as funções do CRUD de Clientes

import axios from "axios"

export async function getClientes() {
  const response = await axios.get('http://localhost:3000/clientes')
  // Dentro de data está o JSON de resposta do back-end
  return response.data
}

export async function addClientes(data) { 
  // O 2º parâmetro do post é o corpo d requisição
  const response = await axios.post('http://localhost:3000/clientes', data)
  
  return response.data
}
