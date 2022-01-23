import { ReactWrapper, shallow } from 'enzyme'
import Home from 'pages/Home'
import { act } from 'react-dom/test-utils'
import React, { PropsWithChildren } from 'react'
import useQuery from 'shared/hooks/useQuery'
import { feedModel } from 'entities/Feed'
import { useTitle } from 'shared/hooks/useTitle'

jest.mock('shared/hooks/useTitle')
jest.mock('shared/hooks/useQuery')
jest.mock('entities/Feed')

jest.mock('shared/api')

jest.mock('layouts', () => ({
  Main: ({ children }: PropsWithChildren<any>) => <>{children}</>,
}))

const mockUseTitle = useTitle as jest.Mock
const mockUseFeed = feedModel.useFeed as jest.Mock
const mockUseQuery = useQuery as jest.Mock

describe('Home page tests', function () {
  beforeEach(() => {
    mockUseQuery.mockReturnValue({
      get() {
        return 'human'
      },
    })

    mockUseFeed.mockReturnValue({
      execute: jest.fn(),
      feed: [],
      error: false,
      isLoading: false,
    })
  })

  it('should call useFeed with query param', async function () {
    shallow(<Home />)

    expect(mockUseFeed).toBeCalledWith(undefined, 'human')
  })

  it('should call useTitle with query title', async function () {
    shallow(<Home />)

    expect(mockUseTitle).toBeCalledWith(`Trending for "human"`)
  })

  it('should call useTitle with trending title when query is null or empty', async function () {
    mockUseQuery.mockReturnValue({
      get() {
        return ''
      },
    })
    shallow(<Home />)

    expect(mockUseTitle).toBeCalledWith(`Trending`)
  })

  it('should render an error message when request fails', async function () {
    mockUseFeed.mockReturnValue({
      execute: jest.fn(),
      feed: [],
      error: true,
      isLoading: false,
    })

    const wrapper = shallow(<Home />)

    wrapper.setProps({})

    expect(wrapper.find('ErrorTitle').prop('isError')).toBe(true)
    expect(wrapper.find('Loader')).toHaveLength(0)
  })

  it('should render the Loader when data is loading', async function () {
    mockUseFeed.mockReturnValue({
      execute: jest.fn(),
      feed: [],
      error: false,
      isLoading: true,
    })

    const wrapper = shallow(<Home />)

    wrapper.setProps({})

    expect(wrapper.find('ErrorTitle').prop('isError')).toBe(false)
    expect(wrapper.find('Loader').prop('isLoading')).toBe(true)
  })
})
