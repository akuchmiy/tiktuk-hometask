import { apiClient } from 'shared/api/base'
import { getUserInfo } from 'shared/api/user'
import { readFileFromWWW } from 'shared/lib'

jest.mock('shared/api/base')
jest.mock('shared/lib')

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>
const mockedReadFileFromWWW = readFileFromWWW as jest.Mock

describe('user service tests', () => {
  beforeEach(() => {
    mockedApiClient.get.mockResolvedValue({ data: { user: 'dima' } })
  })

  it('should call the get method of the API client instance with the appropriate URL', async () => {
    const username = 'Dima'

    await getUserInfo(username)

    expect(mockedApiClient.get.mock.calls[0][0]).toBe(`user/info/${username}`)
  })

  it('should return data from the response object', async () => {
    const user = await getUserInfo("doesn't matter")

    expect(user).toEqual({ user: 'dima' })
  })

  it('should throw an error if promise rejected', async () => {
    mockedApiClient.get.mockRejectedValue(new Error('lol'))

    const user = async () => await getUserInfo("doesn't matter")

    await expect(user).rejects.toThrow('lol')
  })

  it('should call readFileFromWWW when window.cordova is defined', async () => {
    Object.defineProperty(window, 'cordova', {
      writable: true,
      value: 'someValue',
    })
    mockedReadFileFromWWW.mockResolvedValue('{"user": {}}')

    await getUserInfo("doesn't matter")

    expect(mockedReadFileFromWWW).toBeCalledWith('userInfo.json')

    Object.defineProperty(window, 'cordova', {
      writable: true,
      value: undefined,
    })
  })
})
