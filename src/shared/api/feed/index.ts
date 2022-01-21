import { apiClient } from 'shared/api/base'
import { AxiosRequestConfig } from 'axios'
import { Feed } from './models'

export async function getTrendingFeed(): Promise<Feed[]> {
  return getFeed('/trending/feed')
}

export async function getUserFeed(username: string): Promise<Feed[]> {
  return getFeed(`/user/feed/${username}`)
}

export async function getHashtagFeed(hashtag: string): Promise<Feed[]> {
  return getFeed(`/hashtag/feed/${hashtag}`)
}

async function getFeed(url: string, config?: AxiosRequestConfig) {
  try {
    const { data } = await apiClient.get<Feed[]>(url, config)

    return data
  } catch (e: any) {
    if (e instanceof Error) throw new Error(e.message)
    else throw new Error('Unexpected error')
  }
}
