import { mount } from 'enzyme'
import ThemeChanger from 'components/layout/TheHeader/ThemeChanger'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props: FontAwesomeIconProps) => <span>{props.icon}</span>,
}))

describe('ThemeChanger tests', () => {
  describe('prefers color scheme light', function () {
    const listener = jest.fn()

    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          addEventListener: listener,
        })),
      })
    })

    it('should render icon with moon if matchMedia (prefers color scheme dark) is false', () => {
      const wrapper = mount(<ThemeChanger />)

      expect(wrapper.html()).toContain('fasmoon')
      expect(wrapper.html()).not.toContain('fassun')
    })

    it('documentElement classList should not contain dark class', () => {
      mount(<ThemeChanger />)

      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('should change document class and icon to dark when button is pressed', () => {
      const wrapper = mount(<ThemeChanger />)

      wrapper.find('button').simulate('click')

      expect(wrapper.html()).toContain('fassun')
      expect(wrapper.html()).not.toContain('fasmoon')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should call addEventListener on render', function () {
      mount(<ThemeChanger />)

      expect(
        (window.matchMedia('') as jest.Mocked<MediaQueryList>).addEventListener
      ).toBeCalledTimes(1)
    })
  })

  describe('prefers color scheme dark', function () {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: true,
          addEventListener: jest.fn(),
        })),
      })
    })

    it('should render icon with sun if matchMedia (prefers color scheme dark) is true', () => {
      const wrapper = mount(<ThemeChanger />)

      expect(wrapper.html()).toContain('fassun')
      expect(wrapper.html()).not.toContain('fasmoon')
    })

    it('documentElement classList should contain dark class', () => {
      mount(<ThemeChanger />)

      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should change document class and icon to light when button is pressed', () => {
      const wrapper = mount(<ThemeChanger />)

      wrapper.find('button').simulate('click')

      expect(wrapper.html()).toContain('fasmoon')
      expect(wrapper.html()).not.toContain('fassun')
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })
})
