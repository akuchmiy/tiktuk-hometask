import { mount } from 'enzyme'
import WithDataFeedList from 'components/FeedList/WithDataFeedList'
import useQuery from 'shared/hooks/useQuery'
import useFeed from 'hooks/useFeed'

jest.mock('shared/hooks/useQuery')
jest.mock('hooks/useFeed')
jest.mock(
  'components/FeedList/FeedList',
  () =>
    function FeedList() {
      return <span>FeedList</span>
    }
)

describe('WithDataFeedList tests', function () {
  const mockUseQuery = useQuery as jest.Mock
  const mockUseFeed = useFeed as jest.Mock

  beforeEach(() => {
    mockUseQuery.mockReturnValue({
      get() {
        return 'lol'
      },
    })

    mockUseFeed.mockReturnValue({
      feed: ['feedlist'],
      error: false,
      isLoading: false,
    })
  })

  it('should change document title to username`s profile', async function () {
    const username = 'Vasya'
    await mount(<WithDataFeedList username={username} />)

    expect(document.title).toBe(`${username}'s profile`)
  })

  it('should change document title to trending hashtag', async function () {
    await mount(<WithDataFeedList />)

    expect(document.title).toBe(`Trending for "lol"`)
  })

  it('should change document title to trending', async function () {
    mockUseQuery.mockReturnValueOnce({
      get() {
        return ''
      },
    })

    await mount(<WithDataFeedList />)

    expect(document.title).toBe(`Trending`)
  })

  it('should not display error', async function () {
    const wrapper = await mount(<WithDataFeedList />)

    expect(wrapper.find('h1').text()).not.toContain('Something went wrong')
  })

  it('should display error', async function () {
    mockUseFeed.mockReturnValueOnce({
      feed: null,
      error: true,
      isLoading: false,
    })
    const wrapper = await mount(<WithDataFeedList />)

    expect(wrapper.find('h1').text()).toContain('Something went wrong')
  })
})
