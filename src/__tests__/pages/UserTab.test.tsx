import { mount, ReactWrapper } from 'enzyme'
import UserTab from 'pages/UserTab'
import { act } from 'react-dom/test-utils'
import { getUserInfo } from 'shared/api'
import router from 'react-router-dom'
import React, { PropsWithChildren } from 'react'
import { useAsync } from 'shared/hooks/useAsync'
import useFeed from 'hooks/useFeed'
import { useTitle } from 'shared/hooks/useTitle'

jest.mock('features/ControllableFeedList', () => ({
  ControllableFeedList: (props: any) => {
    return <span className={'feed-list'}>ControllableFeedList</span>
  },
}))
jest.mock(
  'components/UserInfo/UserInfo',
  () =>
    function UserInfo() {
      return <span>userInfo</span>
    }
)
jest.mock(
  'shared/ui/Loader',
  () =>
    function Loader({ children }: React.PropsWithChildren<any>) {
      return <>{children}</>
    }
)
jest.mock('shared/ui/ErrorTitle', () => ({
  ErrorTitle: ({ children }: PropsWithChildren<any>) => <h1>{children}</h1>,
}))
jest.mock('react-router-dom', () => ({
  useParams: () => ({ username: 'Vasya' }),
}))
jest.mock('shared/hooks/useAsync')
jest.mock('shared/hooks/useTitle')
jest.mock('hooks/useFeed')

jest.mock('shared/api')

jest.mock('layouts', () => ({
  Main: ({ children }: PropsWithChildren<any>) => <>{children}</>,
}))

const mockUseTitle = useTitle as jest.Mock
const mockUseAsync = useAsync as jest.Mock
const mockUseFeed = useFeed as jest.Mock
const mockGetUserInfo = getUserInfo as jest.Mock

describe('UserInfo tests', function () {
  beforeEach(() => {
    mockUseAsync.mockReturnValue({
      execute: jest.fn(),
      data: {},
      error: false,
      isLoading: false,
    })

    mockUseFeed.mockReturnValue({
      execute: jest.fn(),
      feed: [],
      error: false,
      isLoading: false,
    })
  })

  it('should call useTitle with Vasya', async function () {
    await act(async () => {
      await mount(<UserTab />)
    })

    expect(mockUseTitle).toBeCalledWith(`Vasya's profile`)
  })

  it('should call getUserInfo with username', async function () {
    await act(async () => {
      await mount(<UserTab />)
    })

    const fetchData = mockUseAsync.mock.calls.pop()[0]
    fetchData()

    expect(mockGetUserInfo).toBeCalledWith('Vasya')
  })

  it('should not render an error message when both requests succeeded', async function () {
    let wrapper: ReactWrapper
    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('ErrorTitle').prop('isError')).toBe(false)
  })

  it('should render an error message when at least one request fails', async function () {
    mockUseFeed.mockReturnValue({
      execute: jest.fn(),
      feed: [],
      error: true,
      isLoading: false,
    })
    let wrapper: ReactWrapper
    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('ErrorTitle').prop('isError')).toBe(true)
  })

  it('should contain loading prop = false', async function () {
    let wrapper: ReactWrapper
    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('Loader').prop('isLoading')).toBe(false)
  })

  it('should contain loading prop when at least one request is loading', async function () {
    mockUseFeed.mockReturnValue({
      execute: jest.fn(),
      feed: [],
      error: true,
      isLoading: false,
    })
    let wrapper: ReactWrapper
    await act(async () => {
      wrapper = await mount(<UserTab />)
    })

    wrapper.setProps({})

    expect(wrapper.find('ErrorTitle').prop('isError')).toBe(true)
  })
})
