import { mount, shallow } from 'enzyme'
import FeedList from 'components/FeedList/FeedList'
import useSmallScreen from 'shared/hooks/useSmallScreen'
import React, { useEffect } from 'react'
import FeedItem, { FeedItemProps } from 'components/FeedItem/FeedItem'
import { act } from 'react-dom/test-utils'
import { Feed } from 'shared/api'
import Loader from 'shared/ui/Loader'

jest.mock('shared/ui/Loader')
const mockLoader = Loader as jest.Mock

jest.mock(
  'shared/ui/AmountChanger',
  () =>
    function AmountChanger() {
      return <span>AmountChanger</span>
    }
)
jest.mock('components/FeedItem/FeedItem')

jest.mock('shared/hooks/useSmallScreen')

const feedList = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
] as unknown as Feed[]

describe('FeedList tests', function () {
  const mockObserve = jest.fn()
  const mockDisconnect = jest.fn()
  const mockObserver = jest.fn()

  let playSpy: jest.SpyInstance
  let pauseSpy: jest.SpyInstance
  let scrollSpy: jest.SpyInstance

  let mockUseSmallScreen: jest.Mock

  beforeAll(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      value: mockObserver,
    })
  })

  beforeEach(() => {
    mockLoader.mockImplementation(
      ({
        isLoading,
        children,
      }: React.PropsWithChildren<{ isLoading: boolean }>) => <>{children}</>
    )

    mockObserver.mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    }))

    FeedItem.displayName = 'FeedItem'
    const MockFeedItem = FeedItem as unknown as jest.Mocked<{
      render: (
        props: React.PropsWithChildren<FeedItemProps>,
        ref: React.Ref<HTMLVideoElement>
      ) => JSX.Element
    }>

    MockFeedItem.render.mockImplementation(
      ({ onVideoEnd, feed }: FeedItemProps, ref) => {
        useEffect(() => {
          if (feed.id === '1') {
            onVideoEnd()
          }
        }, [])
        return <video ref={ref} />
      }
    )

    mockUseSmallScreen = useSmallScreen as jest.Mock
    mockUseSmallScreen.mockReturnValue(true)

    playSpy = jest.spyOn(HTMLMediaElement.prototype, 'play')
    pauseSpy = jest.spyOn(HTMLMediaElement.prototype, 'pause')
    scrollSpy = jest.spyOn(window, 'scrollTo')
  })

  it('should render FeedItems without AmountChanger', function () {
    const wrapper = shallow(<FeedList feedList={feedList} />)

    expect(wrapper.find('FeedItem')).toHaveLength(feedList.length)
    expect(wrapper.find('AmountChanger')).toHaveLength(0)
  })

  it('should render FeedItems with AmountChanger', function () {
    mockUseSmallScreen.mockReturnValueOnce(false)
    const wrapper = shallow(<FeedList feedList={feedList} />)

    expect(wrapper.find('FeedItem')).toHaveLength(feedList.length)
    expect(wrapper.find('AmountChanger')).toHaveLength(1)
  })

  it('should not render FeedItems', function () {
    const wrapper = shallow(<FeedList feedList={[]} />)

    expect(wrapper.find('FeedItem')).toHaveLength(0)
  })

  it('should create an IntersectionObserver instance', async function () {
    await mount(<FeedList feedList={feedList} />)

    expect(mockObserver).toBeCalledTimes(1)
    expect(mockObserve).toBeCalledTimes(feedList.length)
  })

  it('should play next video and scroll to it', async function () {
    await mount(<FeedList feedList={feedList} />)

    expect(scrollSpy).toBeCalledTimes(1)
    expect(playSpy).toBeCalledTimes(1)
  })

  it('intersectionObserver callback should pause all videos and play one which was intersected when columns === 1', async function () {
    await mount(<FeedList currentColumns={1} feedList={feedList} />)

    const intersectionCallback = mockObserver.mock.calls.pop()[0]

    const entries = [
      {
        target: { play: jest.fn(), pause: jest.fn() },
        isIntersecting: true,
      },
    ]

    await act(async () => {
      await intersectionCallback(entries)
    })

    expect(entries[0].target.play).toBeCalledTimes(1)
    expect(pauseSpy).toBeCalledTimes(4)
  })

  it('intersectionObserver callback should not pause all videos and not play one which was intersected when columns !== 1', async function () {
    mockUseSmallScreen.mockReturnValueOnce(false)
    await mount(<FeedList currentColumns={2} feedList={feedList} />)

    const intersectionCallback = mockObserver.mock.calls.pop()[0]

    const entries = [
      {
        target: { play: jest.fn(), pause: jest.fn() },
        isIntersecting: true,
      },
    ]

    await act(async () => {
      await intersectionCallback(entries)
    })

    expect(entries[0].target.play).toBeCalledTimes(0)
    expect(pauseSpy).toBeCalledTimes(0)
  })

  it('should pause the video which was intersected with property isIntersecting === false', async function () {
    await mount(<FeedList currentColumns={1} feedList={feedList} />)

    const intersectionCallback = mockObserver.mock.calls.pop()[0]

    const entries = [
      {
        target: { play: jest.fn(), pause: jest.fn() },
        isIntersecting: false,
      },
    ]

    await act(async () => {
      await intersectionCallback(entries)
    })

    expect(entries[0].target.play).toBeCalledTimes(0)
    expect(entries[0].target.pause).toBeCalledTimes(1)
  })
})
