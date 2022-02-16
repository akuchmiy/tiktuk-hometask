import axios from 'axios'
import { API_HOST } from '../constants'
import { API_KEY } from '../config'

export const apiClient = axios.create({
  baseURL: `https://${API_HOST}/`,
  headers: {
    'x-rapidapi-host': `${API_HOST}/`,
    'x-rapidapi-key': API_KEY,
  },
})
