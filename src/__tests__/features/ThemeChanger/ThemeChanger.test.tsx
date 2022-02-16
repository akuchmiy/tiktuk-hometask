import { mount } from 'enzyme'
import { ThemeChanger } from 'features/ThemeChanger'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDarkMode } from 'features/ThemeChanger/model'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props: FontAwesomeIconProps) => <span>{props.icon}</span>,
}))

jest.mock('features/ThemeChanger/model')

const mockUseDarkMode = useDarkMode as jest.Mock

describe('ThemeChanger tests', () => {
  const mockSetIsDark = jest.fn()

  beforeEach(() => {
    mockUseDarkMode.mockReturnValue({
      isDark: false,
      setIsDark: mockSetIsDark,
    })
  })

  it('should render icon with moon if isDark is false', () => {
    const wrapper = mount(<ThemeChanger />)

    expect(wrapper.html()).toContain('fasmoon')
    expect(wrapper.html()).not.toContain('fassun')
  })

  it('documentElement classList should not contain dark class', () => {
    mount(<ThemeChanger />)

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should change document class and icon to dark when isDark is true', () => {
    mockUseDarkMode.mockReturnValue({
      isDark: true,
      setIsDark: mockSetIsDark,
    })
    const wrapper = mount(<ThemeChanger />)

    expect(wrapper.html()).toContain('fassun')
    expect(wrapper.html()).not.toContain('fasmoon')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should call setIsDark with true when button is pressed', () => {
    const wrapper = mount(<ThemeChanger />)

    wrapper.find('button').simulate('click')

    expect(mockSetIsDark).toBeCalledWith(true)
  })

  it('should call setIsDark with false when button is pressed', () => {
    mockUseDarkMode.mockReturnValue({
      isDark: true,
      setIsDark: mockSetIsDark,
    })
    const wrapper = mount(<ThemeChanger />)

    wrapper.find('button').simulate('click')

    expect(mockSetIsDark).toBeCalledWith(false)
  })
})
