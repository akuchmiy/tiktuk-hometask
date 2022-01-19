import axios from 'axios'
import { API_KEY } from 'shared/config'

const apiClient = axios.create({
  baseURL: 'https://tiktok33.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'tiktok33.p.rapidapi.com/',
    'x-rapidapi-key': API_KEY,
  },
})

export default apiClient
