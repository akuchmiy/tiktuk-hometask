import useFeed from 'hooks/useFeed'
import FeedService from 'services/FeedService'
import Enzyme, { mount } from 'enzyme'
import { FC } from 'react'
import { Feed } from 'domain/Feed'
import { act } from 'react-dom/test-utils'

jest.mock('services/FeedService')

const mockFeedService = FeedService as jest.Mocked<typeof FeedService>

interface UseFeedProps {
  username: string | undefined
  query: string | null
}

const UseFeedWrapper: FC<UseFeedProps> = ({ username, query }) => {
  const [feed, isError] = useFeed(username, query)

  return (
    <>
      <span className={'feed'}>{feed}</span>
      <span className={'error'}>{isError ? 'true' : 'false'}</span>
    </>
  )
}

describe('useQuery tests', function () {
  let wrapper: Enzyme.ReactWrapper
  beforeAll(() => {
    process.env.NODE_ENV = 'production'
  })

  beforeEach(async () => {
    const returnData = ['data', 'data']

    mockFeedService.getUserFeed.mockResolvedValue(
      returnData as unknown as Feed[]
    )

    mockFeedService.getHashtagFeed.mockResolvedValue(
      returnData as unknown as Feed[]
    )
    mockFeedService.getTrendingFeed.mockResolvedValue(
      returnData as unknown as Feed[]
    )

    const username = undefined
    const query = null

    await act(async () => {
      wrapper = await mount(
        <UseFeedWrapper username={username} query={query} />
      )
    })
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

    expect(mockFeedService.getUserFeed).toBeCalledWith(username)
  })

  it('should call getHashtagFeed when query is not null', async function () {
    const username = undefined
    const query = 'query'
    await act(async () => {
      await mount(<UseFeedWrapper username={username} query={query} />)
    })

    expect(mockFeedService.getHashtagFeed).toBeCalledWith(query)
  })

  it('should call getTrendingFeed when query and username are not provided', async function () {
    expect(mockFeedService.getTrendingFeed).toBeCalled()
  })

  it('should initial render without error', async function () {
    expect(wrapper.find('.error').text()).toBe('false')
  })

  it('should render feedList when fetch was successful', async function () {
    expect(wrapper.find('.feed').text()).toBe('datadata')
  })

  it('should return error when data length is 0', async function () {
    mockFeedService.getTrendingFeed.mockResolvedValue([] as unknown as Feed[])
    const username = undefined
    const query = null
    let wrapper: Enzyme.ReactWrapper

    await act(async () => {
      wrapper = await mount(
        <UseFeedWrapper username={username} query={query} />
      )
    })

    expect(wrapper.find('.error').text()).toBe('true')
  })
})
