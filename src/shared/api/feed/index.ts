import { Feed } from 'domain/Feed'
import { apiClient } from 'shared/api'
import { AxiosRequestConfig } from 'axios'

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
    if (!Array.isArray(data)) {
      return []
    }
    return data
  } catch (e) {
    return []
  }
}
