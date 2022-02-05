import { feedModel } from 'entities/Feed'
import { Feed, getHashtagFeed, getTrendingFeed, getUserFeed } from 'shared/api'
import Enzyme, { mount } from 'enzyme'
import { FC } from 'react'
import { act } from 'react-dom/test-utils'
import { useAsync } from 'shared/hooks/useAsync'

jest.mock('shared/api', () => ({
  getHashtagFeed: jest.fn(),
  getUserFeed: jest.fn(),
  getTrendingFeed: jest.fn(),
}))

jest.mock('shared/hooks/useAsync')

const mockUseAsync = useAsync as jest.Mock

const mockGetHashtagFeed = getHashtagFeed as jest.Mock
const mockGetUserFeed = getUserFeed as jest.Mock
const mockGetTrendingFeed = getTrendingFeed as jest.Mock

interface UseFeedProps {
  username: string | undefined
  query: string | null
}

const UseFeedWrapper: FC<UseFeedProps> = ({ username, query }) => {
  feedModel.useFeed(username, query)

  return <span>useFeed</span>
}

describe('useFeed tests', function () {
  let wrapper: Enzyme.ReactWrapper
  beforeAll(() => {
    process.env.NODE_ENV = 'production'
  })

  beforeEach(async () => {
    mockUseAsync.mockResolvedValue({
      data: null,
      error: null,
      isLoading: false,
      execute: () => null,
    })

    mockGetUserFeed.mockResolvedValue(['user'] as unknown as Feed[])
    mockGetHashtagFeed.mockResolvedValue(['hashtag'] as unknown as Feed[])
    mockGetTrendingFeed.mockResolvedValue(['trending'] as unknown as Feed[])
  })

  afterAll(() => {
    process.env.NODE_ENV = 'test'
  })

  it('should call getUserFeed when node env is production and username is not undefined', async function () {
    const username = 'vasya'
    const query = null
    await act(async () => {
      await mount(<UseFeedWrapper username={username} query={query} />)
    })

    const lastFetchFeedFunction = mockUseAsync.mock.calls.pop()[0]
    lastFetchFeedFunction()

    expect(mockGetUserFeed).toBeCalledWith(username)
  })

  it('should call getHashtagFeed when query is not null', async function () {
    const username = undefined
    const query = 'query'
    await act(async () => {
      await mount(<UseFeedWrapper username={username} query={query} />)
    })

    const lastFetchFeedFunction = mockUseAsync.mock.calls.pop()[0]
    lastFetchFeedFunction()

    expect(mockGetHashtagFeed).toBeCalledWith(query)
  })

  it('should call getTrendingFeed when query and username are not provided', async function () {
    const username = undefined
    const query = null
    await act(async () => {
      await mount(<UseFeedWrapper username={username} query={query} />)
    })

    const lastFetchFeedFunction = mockUseAsync.mock.calls.pop()[0]
    lastFetchFeedFunction()

    expect(mockGetTrendingFeed).toBeCalled()
  })
})
