import { apiClient } from 'shared/api/base'
import { getUserInfo } from 'shared/api/user'

jest.mock('shared/api/base')

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>

describe('user service tests', () => {
  it('should call the get method of the API client instance with the appropriate URL', async () => {
    const username = 'Dima'

    const user = await getUserInfo(username)

    expect(mockedApiClient.get.mock.calls[0][0]).toBe(`user/info/${username}`)
    expect(user).toBeNull()
  })

  it('should return data from the response object it data.user is present', async () => {
    mockedApiClient.get.mockResolvedValueOnce({ data: { user: 'dima' } })

    const user = await getUserInfo('doesnt matter')

    expect(user).toEqual({ user: 'dima' })
  })

  it('should return null if user field is not present in the response data object', async () => {
    mockedApiClient.get.mockResolvedValueOnce({ data: { notUser: 'dima' } })

    const user = await getUserInfo('doesnt matter')

    expect(user).toBeNull()
  })
})