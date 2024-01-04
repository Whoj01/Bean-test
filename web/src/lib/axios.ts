import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.beantest.devjosuehub.com.br',
  headers: {
    'Content-Type': 'application/json'
  }
})