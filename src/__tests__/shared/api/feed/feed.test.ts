import { apiClient } from 'shared/api/base'
import { getHashtagFeed, getTrendingFeed, getUserFeed } from 'shared/api/feed'

jest.mock('shared/api/base')

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>

describe('feedService tests', () => {
  beforeEach(() => {
    mockedApiClient.get.mockResolvedValue({ data: ['data'] })
  })

  it('should call apiClient with trending feed url and return empty array on empty data', async () => {
    const result = await getTrendingFeed()

    expect(mockedApiClient.get.mock.calls[0][0]).toBe('/trending/feed')
    expect(result).toEqual(['data'])
  })

  it('should return response data', async () => {
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

  it('should throw an error when promise rejects with an Error type', async () => {
    mockedApiClient.get.mockRejectedValue(new Error('an error'))

    await expect(getTrendingFeed()).rejects.toThrowError('an error')
  })

  it('should throw an error when promise rejects with other type', async () => {
    mockedApiClient.get.mockRejectedValue('string')

    await expect(getTrendingFeed()).rejects.toThrowError('Unexpected error')
  })
})
