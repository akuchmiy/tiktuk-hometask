import { mount, ReactWrapper } from 'enzyme'
import UserTab from 'pages/UserTab'
import { act } from 'react-dom/test-utils'
import { getUserInfo } from 'shared/api'
import router from 'react-router-dom'
import React, { PropsWithChildren } from 'react'
import Loader from 'shared/ui/Loader'

jest.mock('components/FeedList/WithDataFeedList', () => {
  return function (props: any) {
    return <span className={'feed-list'}>{props.username}</span>
  }
})
jest.mock('shared/ui/Loader')
const mockLoader = Loader as jest.Mock

jest.mock('shared/api')
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}))

jest.mock('layouts', () => ({
  Main: ({ children }: PropsWithChildren<any>) => <>{children}</>,
}))

const mockGetUserInfo = getUserInfo as jest.Mock
const mockUseParams = (router as jest.Mocked<typeof router>).useParams

describe('UserInfo tests', function () {
  beforeEach(() => {
    mockLoader.mockImplementation(
      ({
        isLoading,
        children,
      }: React.PropsWithChildren<{ isLoading: boolean }>) => <>{children}</>
    )

    mockGetUserInfo.mockResolvedValue(42)
    mockUseParams.mockReturnValue({
      username: 'username',
    })
  })

  afterEach(() => {
    mockGetUserInfo.mockClear()
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

  it('should render Loader when data is null', async function () {
    mockGetUserInfo.mockResolvedValue(null)
    let wrapper: ReactWrapper

    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('Loader').prop('isLoading')).toBe(true)
  })

  it('should render error when fetch fails', async function () {
    mockGetUserInfo.mockRejectedValue(new Error('error'))
    let wrapper: ReactWrapper

    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('h1').text()).toBe('Something went wrong')
  })
})
