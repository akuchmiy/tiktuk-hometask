import axios from 'axios'
import { API_KEY } from 'shared/config'
import { API_HOST } from '../constants'

export const apiClient = axios.create({
  baseURL: `https://${API_HOST}/`,
  headers: {
    'x-rapidapi-host': `${API_HOST}/`,
    'x-rapidapi-key': API_KEY,
  },
})

export { getUserFeed, getTrendingFeed, getHashtagFeed } from './feed'
export { getUserInfo } from './user'
