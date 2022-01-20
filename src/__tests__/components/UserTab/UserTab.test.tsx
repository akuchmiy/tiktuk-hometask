import { mount, ReactWrapper } from 'enzyme'
import UserTab from 'components/UserTab/UserTab'
import { act } from 'react-dom/test-utils'
import UserService from 'services/UserService'
import router from 'react-router-dom'

jest.mock('components/FeedList/WithDataFeedList', () => {
  return function (props: any) {
    return <span className={'feed-list'}>{props.username}</span>
  }
})

jest.mock('services/UserService')

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}))

const mockGetInfo = (UserService as jest.Mocked<typeof UserService>).getUserInfo
const mockUseParams = (router as jest.Mocked<typeof router>).useParams

describe('UserTab tests', function () {
  beforeEach(() => {
    mockGetInfo.mockResolvedValue(42)
    mockUseParams.mockReturnValue({
      username: 'username',
    })
  })

  afterEach(() => {
    mockGetInfo.mockClear()
    mockUseParams.mockClear()
  })

  it('should initial render loader', async function () {
    let wrapper: ReactWrapper
    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    expect(wrapper.find('Loader')).toHaveLength(1)
  })

  it('should render FeedList when data is loaded', async function () {
    let wrapper: ReactWrapper
    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('.feed-list')).toHaveLength(1)
    expect(wrapper.find('.feed-list').text()).toBe('username')
  })

  it('should render error when data is null', async function () {
    mockGetInfo.mockResolvedValue(null)
    let wrapper: ReactWrapper

    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('h1').text()).toBe('Something went wrong')
  })

  it('should render error when username is empty', async function () {
    mockUseParams.mockReset()
    mockUseParams.mockReturnValue({ username: '' })

    let wrapper: ReactWrapper

    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('h1').text()).toBe('Something went wrong')
  })
})
