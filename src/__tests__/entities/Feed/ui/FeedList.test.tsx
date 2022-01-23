import { mount, shallow } from 'enzyme'
import { FeedList } from 'entities/Feed/ui/FeedList'
import React, { useEffect } from 'react'
import { FeedItem, FeedItemProps } from 'entities/Feed/ui/FeedItem'
import { act } from 'react-dom/test-utils'
import { Feed } from 'shared/api'

jest.mock('entities/Feed/ui/FeedItem')

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

  beforeAll(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      value: mockObserver,
    })
  })

  beforeEach(() => {
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

    playSpy = jest.spyOn(HTMLMediaElement.prototype, 'play')
    pauseSpy = jest.spyOn(HTMLMediaElement.prototype, 'pause')
    scrollSpy = jest.spyOn(window, 'scrollTo')
  })

  it('should not render FeedItems', function () {
    const wrapper = shallow(<FeedList feedList={[]} columns={1} />)

    expect(wrapper.find('FeedItem')).toHaveLength(0)
  })

  it('should create an IntersectionObserver instance', async function () {
    await mount(<FeedList feedList={feedList} columns={1} />)

    expect(mockObserver).toBeCalledTimes(1)
    expect(mockObserve).toBeCalledTimes(feedList.length)
  })

  it('should play next video and scroll to it', async function () {
    scrollSpy = jest.spyOn(window, 'scrollTo')

    await act(async () => {
      await mount(<FeedList feedList={feedList} columns={1} />)
    })

    expect(scrollSpy).toBeCalledTimes(1)
    expect(playSpy).toBeCalledTimes(1)
  })

  it('intersectionObserver callback should pause all videos and play one which was intersected when columns === 1', async function () {
    await mount(<FeedList columns={1} feedList={feedList} />)

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

  it('intersectionObserver should not be created when columns !== 1', async function () {
    await mount(<FeedList columns={2} feedList={feedList} />)

    expect(mockObserver).not.toBeCalled()
  })

  it('should pause the video which was intersected with property isIntersecting === false', async function () {
    await mount(<FeedList columns={1} feedList={feedList} />)

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
