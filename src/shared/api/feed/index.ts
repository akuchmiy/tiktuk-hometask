import { apiClient } from 'shared/api/base'
import { AxiosRequestConfig } from 'axios'
import { Feed } from './models'
import { isDevEnv } from 'shared/config'

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
  const finalUrl = isDevEnv ? 'http://localhost:3000/feed.json' : url
  try {
    const { data } = await apiClient.get<Feed[]>(finalUrl, config)
    checkFeed(data)

    return data
  } catch (e: any) {
    if (e instanceof Error) throw new Error(e.message)
    else throw new Error('Unexpected error')
  }
}

function checkFeed(feedList: Feed[]) {
  if (!Array.isArray(feedList)) throw new Error('Not an array')
}
