import apiClient from '../../services/apiClient'
import { FeedService } from '../../services/FeedService'

jest.mock('../../services/apiClient')

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>
const feedService = new FeedService(mockedApiClient)

describe('feedService tests', () => {
  it('should call apiClient with trending feed url and return empty array on empty data', async () => {
    const result = await feedService.getTrendingFeed()

    expect(mockedApiClient.get.mock.calls[0][0]).toBe('/trending/feed')
    expect(result).toEqual([])
  })

  it('should return empty array if response data is not an array', async () => {
    mockedApiClient.get.mockResolvedValueOnce({ data: { notAnArray: true } })

    const result = await feedService.getTrendingFeed()

    expect(result).toEqual([])
  })

  it('should return response data if it is an array', async () => {
    mockedApiClient.get.mockResolvedValueOnce({ data: ['data'] })

    const result = await feedService.getTrendingFeed()

    expect(result).toEqual(['data'])
  })

  it('should call apiClient with user feed url', async () => {
    const username = 'Dima'

    await feedService.getUserFeed(username)

    expect(mockedApiClient.get.mock.calls[0][0]).toBe(`/user/feed/${username}`)
  })

  it('should call apiClient with hashtag feed url', async () => {
    const hashtag = '#tag'

    await feedService.getHashtagFeed(hashtag)

    expect(mockedApiClient.get.mock.calls[0][0]).toBe(
      `/hashtag/feed/${hashtag}`
    )
  })
})
