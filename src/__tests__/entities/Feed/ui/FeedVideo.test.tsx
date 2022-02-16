import Enzyme, { shallow } from 'enzyme'
import { FeedVideo } from 'entities/Feed/ui/FeedVideo'
import { Feed } from 'shared/api'
import { act } from 'react-dom/test-utils'

const feed: Feed = {} as Feed

describe('FeedVideo tests', function () {
  let wrapper: Enzyme.ShallowWrapper
  let onVideoEnded = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<FeedVideo onVideoEnd={onVideoEnded} feed={feed} />)
  })

  it('video should have aria label when paused', function () {
    expect(wrapper.find('video').prop('aria-label')).toBe(
      'Press enter to resume the video'
    )
  })

  it('video can be paused and played with a click', async function () {
    const play = jest.fn(() => Promise.resolve())
    const pause = jest.fn()

    await act(async () => {
      await wrapper
        .find('video')
        .simulate('click', { target: { paused: true, play, pause } })
    })

    expect(play).toBeCalledTimes(1)
    expect(pause).toBeCalledTimes(0)

    wrapper.setProps({})

    expect(wrapper.find('video').prop('aria-label')).toBe(
      'Press enter to stop the video'
    )
  })

  it('video can be paused and played with an "Enter" keypress', async function () {
    const play = jest.fn()
    const pause = jest.fn()

    await act(async () => {
      await wrapper.find('video').simulate('keypress', {
        nativeEvent: new KeyboardEvent('keypress', { key: 'Enter' }),
        target: { paused: true, play, pause },
      })
    })

    expect(play).toBeCalledTimes(1)
    expect(pause).toBeCalledTimes(0)

    wrapper.setProps({})

    expect(wrapper.find('video').prop('aria-label')).toBe(
      'Press enter to stop the video'
    )
  })

  it('video can be paused after being played', async function () {
    const play = jest.fn()
    const pause = jest.fn()

    await wrapper
      .find('video')
      .simulate('click', { target: { paused: false, play, pause } })

    expect(play).toBeCalledTimes(0)
    expect(pause).toBeCalledTimes(1)
  })

  it('other key presses does not affect video', function () {
    const play = jest.fn(() => Promise.resolve())
    const pause = jest.fn()

    wrapper.find('video').simulate('keypress', {
      nativeEvent: new KeyboardEvent('keypress', { key: 'Alt' }),
      target: { paused: true, play, pause },
    })

    wrapper.find('video').simulate('keypress', {
      nativeEvent: new KeyboardEvent('keypress', { key: 'A' }),
      target: { paused: true, play, pause },
    })
    wrapper.find('video').simulate('keypress', {
      nativeEvent: new KeyboardEvent('keypress', { key: 'Escape' }),
      target: { paused: true, play, pause },
    })

    expect(play).toBeCalledTimes(0)
    expect(pause).toBeCalledTimes(0)
  })

  it('should call onVideoEnded function', function () {
    wrapper.find('video').simulate('ended')

    expect(onVideoEnded).toBeCalledTimes(1)
  })
})
