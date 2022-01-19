import { AxiosInstance } from 'axios'
import { Feed } from 'domain/Feed'
import apiClient from './apiClient'

export class FeedService {
  constructor(private apiClient: AxiosInstance) {
    this.getTrendingFeed = this.getTrendingFeed.bind(this)
    this.getUserFeed = this.getUserFeed.bind(this)
    this.getHashtagFeed = this.getHashtagFeed.bind(this)
  }

  async getTrendingFeed(): Promise<Feed[]> {
    const url = '/trending/feed'
    return this.getFeed(url)
  }

  async getUserFeed(username: string): Promise<Feed[]> {
    const url = `/user/feed/${username}`
    return this.getFeed(url)
  }

  async getHashtagFeed(hashtag: string): Promise<Feed[]> {
    const url = `/hashtag/feed/${hashtag}`
    return this.getFeed(url)
  }

  private async getFeed(url: string, config?: Object) {
    try {
      const { data } = await this.apiClient.get<Feed[]>(url, config)
      if (!Array.isArray(data)) {
        return []
      }
      return data
    } catch (e) {
      return []
    }
  }
}

export default new FeedService(apiClient)
