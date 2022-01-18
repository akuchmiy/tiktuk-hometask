import { mount, ReactWrapper, shallow } from 'enzyme'
import { FC } from 'react'
import useSmallScreen from '../useSmallScreen'
import { act } from 'react-dom/test-utils'

jest.mock('../../config/configService', () => ({
  FEED_LIST_BREAKPOINT: 300,
}))

const UseSmallScreenWrapper: FC = () => {
  const isSmallScreen = useSmallScreen()

  return <span>{isSmallScreen ? 'small' : 'big'}</span>
}

describe('UseSmallScreen tests', function () {
  let wrapper: ReactWrapper
  let windowListenerSpy: jest.SpyInstance
  const originalInnerWidth = Object.getOwnPropertyDescriptor(
    window,
    'innerWidth'
  )

  beforeEach(async () => {
    windowListenerSpy = jest.spyOn(window, 'addEventListener')
    Object.defineProperty(window, 'innerWidth', { value: 400 })
  })

  afterAll(() => {
    Object.defineProperty(
      window,
      'innerWidth',
      originalInnerWidth as PropertyDescriptor
    )
  })

  it('isSmallScreen should be false on window.innerWidth >= 300', async function () {
    wrapper = await mount(<UseSmallScreenWrapper />)
    wrapper.setProps({})

    expect(
      windowListenerSpy.mock.calls.filter((call) => call[0] === 'resize')
    ).toHaveLength(1)
    expect(wrapper.text()).toBe('big')
  })

  it('isSmallScreen should be true on window.innerWidth < 300', async function () {
    Object.defineProperty(window, 'innerWidth', { value: 200 })
    wrapper = await mount(<UseSmallScreenWrapper />)

    wrapper.setProps({})

    expect(
      windowListenerSpy.mock.calls.filter((call) => call[0] === 'resize')
    ).toHaveLength(2)
    expect(wrapper.text()).toBe('small')
  })

  it('isSmallScreen should be false on window.innerWidth >= 300 after being true', async function () {
    Object.defineProperty(window, 'innerWidth', { value: 200 })
    wrapper = await mount(<UseSmallScreenWrapper />)

    wrapper.setProps({})

    const lastResizeListener = windowListenerSpy.mock.calls
      .filter((call) => call[0] === 'resize')
      .pop()[1]

    Object.defineProperty(window, 'innerWidth', { value: 400 })
    act(() => {
      lastResizeListener()
    })

    wrapper.setProps({})

    expect(wrapper.text()).toBe('big')
  })
})
