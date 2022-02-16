import { shallow, ShallowWrapper } from 'enzyme'
import { MainSearch } from 'features/MainSearch'
import React from 'react'

let mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))
jest.mock(
  'shared/ui/Input',
  () =>
    function Input() {
      return <span>Input</span>
    }
)

describe('HeaderSearch tests', function () {
  let wrapper: ShallowWrapper
  beforeEach(() => {
    wrapper = shallow(<MainSearch />)
  })

  it('should render input with empty value', function () {
    expect(wrapper.find('Input').prop('value')).toBe('')
  })

  it('should not render button if query is empty', function () {
    expect(wrapper.find('button').length).toBe(0)
  })

  it('should render button when query is not empty', function () {
    const expectedValue = 'text'

    wrapper
      .find('Input')
      .simulate('change', { target: { value: expectedValue } })

    expect(wrapper.find('button').length).toBe(1)
    expect(wrapper.find('Input').prop('value')).toBe(expectedValue)
  })

  it('should not call navigate if query is empty', function () {
    const preventDefault = jest.fn()

    wrapper.find('form').simulate('submit', { preventDefault })

    expect(mockNavigate.mock.calls.length).toBe(0)
    expect(wrapper.find('Input').prop('value')).toBe('')
    expect(preventDefault).toBeCalledTimes(1)
  })

  it('should call navigate to hashtag when query starts with #', function () {
    const preventDefault = jest.fn()
    const value = 'wasd'

    wrapper.find('Input').simulate('change', { target: { value: `#${value}` } })
    wrapper.find('form').simulate('submit', { preventDefault })

    expect(mockNavigate.mock.calls[0][0]).toBe(`/?query=${value}`)
  })

  it('should call navigate to user page when query does not start with #', function () {
    const preventDefault = jest.fn()
    const username = 'wasd'

    wrapper.find('Input').simulate('change', { target: { value: username } })
    wrapper.find('form').simulate('submit', { preventDefault })

    expect(mockNavigate.mock.calls[0][0]).toBe(`/user/${username}`)
  })
})
