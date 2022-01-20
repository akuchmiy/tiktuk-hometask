import { apiClient } from 'shared/api/base'
import { getHashtagFeed, getTrendingFeed, getUserFeed } from 'shared/api/feed'

jest.mock('shared/api/base')

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>

describe('feedService tests', () => {
  it('should call apiClient with trending feed url and return empty array on empty data', async () => {
    const result = await getTrendingFeed()

    expect(mockedApiClient.get.mock.calls[0][0]).toBe('/trending/feed')
    expect(result).toEqual([])
  })

  it('should return empty array if response data is not an array', async () => {
    mockedApiClient.get.mockResolvedValueOnce({ data: { notAnArray: true } })

    const result = await getTrendingFeed()

    expect(result).toEqual([])
  })

  it('should return response data if it is an array', async () => {
    mockedApiClient.get.mockResolvedValueOnce({ data: ['data'] })

    const result = await getTrendingFeed()

    expect(result).toEqual(['data'])
  })

  it('should call apiClient with user feed url', async () => {
    const username = 'Dima'

    await getUserFeed(username)

    expect(mockedApiClient.get.mock.calls[0][0]).toBe(`/user/feed/${username}`)
  })

  it('should call apiClient with hashtag feed url', async () => {
    const hashtag = '#tag'

    await getHashtagFeed(hashtag)

    expect(mockedApiClient.get.mock.calls[0][0]).toBe(
      `/hashtag/feed/${hashtag}`
    )
  })
})
