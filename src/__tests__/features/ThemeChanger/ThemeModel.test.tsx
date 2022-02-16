import { useDarkMode } from 'features/ThemeChanger/model'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

const UseDarkModeWrapper = ({ isInitialDark }: { isInitialDark: boolean }) => {
  const { isDark } = useDarkMode(isInitialDark)

  return <span>{isDark ? 'Dark' : 'Light'}</span>
}

describe('useDarkMode tests', () => {
  const matchMediaListener = jest.fn()

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockReturnValue({
        matches: false,
        addEventListener: matchMediaListener,
      }),
    })
  })

  it('should initial render with light mode', function () {
    const wrapper = mount(<UseDarkModeWrapper isInitialDark={false} />)

    expect(wrapper.text()).toBe('Light')
  })

  it('should initial render with dark mode', function () {
    const wrapper = mount(<UseDarkModeWrapper isInitialDark={true} />)

    expect(wrapper.text()).toBe('Dark')
  })

  it('should call schemas addEventListener', function () {
    mount(<UseDarkModeWrapper isInitialDark={false} />)

    expect(matchMediaListener).toBeCalledTimes(1)
  })

  it('should initial render with dark mode when schema matches', function () {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: true,
        addEventListener: matchMediaListener,
      }),
    })

    const wrapper = mount(<UseDarkModeWrapper isInitialDark={false} />)

    expect(wrapper.text()).toBe('Dark')
  })

  it('should change mode when listener is invoked', function () {
    const wrapper = mount(<UseDarkModeWrapper isInitialDark={false} />)

    const onMediaChangeListener = matchMediaListener.mock.calls[0][1]
    act(() => {
      onMediaChangeListener({ matches: true })
    })

    expect(wrapper.text()).toBe('Dark')
  })
})
