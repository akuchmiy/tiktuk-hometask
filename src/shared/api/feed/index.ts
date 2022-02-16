import { apiClient } from 'shared/api/base'
import { AxiosRequestConfig } from 'axios'
import { Feed } from './models'
import { isDevEnv, HOST_URL } from 'shared/config'
import { readFileFromWWW } from 'shared/lib'

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
  const finalUrl = isDevEnv ? `${HOST_URL}/feed.json` : url
  try {
    const { data } = await getPlatformIndependentFeed(
      'feed.json',
      finalUrl,
      config
    )
    checkFeed(data)

    return data
  } catch (error: any) {
    if (error instanceof Error) throw error
    else throw new Error('Unexpected error')
  }
}

async function getPlatformIndependentFeed(
  filename: string,
  url: string,
  config?: AxiosRequestConfig
): Promise<{ data: Feed[] }> {
  if (!window.cordova) return apiClient.get<Feed[]>(url, config)

  const result = await readFileFromWWW(filename)

  return {
    data: JSON.parse(result),
  }
}

function checkFeed(feedList: Feed[]) {
  if (!Array.isArray(feedList)) throw new Error('Not an array')
}
