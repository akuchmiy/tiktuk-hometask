import { shallow } from 'enzyme'
import UserTab from 'pages/UserTab'
import { getUserInfo } from 'shared/api'
import React, { PropsWithChildren } from 'react'
import { useAsync } from 'shared/hooks/useAsync'
import { feedModel } from 'entities/Feed'
import { useTitle } from 'shared/hooks/useTitle'

jest.mock('react-router-dom', () => ({
  useParams: () => ({ username: 'Vasya' }),
}))
jest.mock('shared/hooks/useAsync')
jest.mock('shared/hooks/useTitle')
jest.mock('entities/Feed')

jest.mock('shared/api')

jest.mock(
  'shared/ui/Loader',
  () =>
    function Loader() {
      return <span>Loader</span>
    }
)
jest.mock('layouts', () => ({
  Main: ({ children }: PropsWithChildren<any>) => <>{children}</>,
}))

const mockUseTitle = useTitle as jest.Mock
const mockUseAsync = useAsync as jest.Mock
const mockUseFeed = feedModel.useFeed as jest.Mock
const mockGetUserInfo = getUserInfo as jest.Mock

describe('UserInfo page tests', function () {
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
    shallow(<UserTab />)

    expect(mockUseTitle).toBeCalledWith(`Vasya's profile`)
  })

  it('should call getUserInfo with username', async function () {
    shallow(<UserTab />)

    const fetchData = mockUseAsync.mock.calls.pop()[0]
    fetchData()

    expect(mockGetUserInfo).toBeCalledWith('Vasya')
  })

  it('should not render an error message when both requests succeeded', async function () {
    const wrapper = shallow(<UserTab />)

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
    const wrapper = shallow(<UserTab />)

    wrapper.setProps({})

    expect(wrapper.find('ErrorTitle').prop('isError')).toBe(true)
  })

  it('should contain loading prop = false', async function () {
    const wrapper = shallow(<UserTab />)

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
    const wrapper = shallow(<UserTab />)

    wrapper.setProps({})

    expect(wrapper.find('ErrorTitle').prop('isError')).toBe(true)
  })
})
