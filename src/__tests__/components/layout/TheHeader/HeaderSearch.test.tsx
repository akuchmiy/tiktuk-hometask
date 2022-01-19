import { shallow, ShallowWrapper } from 'enzyme'
import HeaderSearch from 'components/layout/TheHeader/HeaderSearch'

let mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('HeaderSearch tests', function () {
  let wrapper: ShallowWrapper
  beforeEach(() => {
    wrapper = shallow(<HeaderSearch />)
  })

  it('should render input with empty value', function () {
    expect(wrapper.find('BasicInput').prop('value')).toBe('')
  })

  it('should not render button if query is empty', function () {
    expect(wrapper.find('button').length).toBe(0)
  })

  it('should render button when query is not empty', function () {
    wrapper.find('BasicInput').simulate('change', { target: { value: 'text' } })

    expect(wrapper.find('button').length).toBe(1)
    expect(wrapper.find('BasicInput').prop('value')).toBe('text')
  })

  it('should not call navigate if query is empty', function () {
    const preventDefault = jest.fn()

    wrapper.find('form').simulate('submit', { preventDefault })

    expect(mockNavigate.mock.calls.length).toBe(0)
    expect(wrapper.find('BasicInput').prop('value')).toBe('')
    expect(preventDefault).toBeCalledTimes(1)
  })

  it('should call navigate to hashtag when query starts with #', function () {
    const preventDefault = jest.fn()

    wrapper
      .find('BasicInput')
      .simulate('change', { target: { value: '#wasd' } })
    wrapper.find('form').simulate('submit', { preventDefault })

    expect(mockNavigate.mock.calls[0][0]).toBe('/?query=wasd')
  })

  it('should call navigate to user page when query does not start with #', function () {
    const preventDefault = jest.fn()

    wrapper.find('BasicInput').simulate('change', { target: { value: 'wasd' } })
    wrapper.find('form').simulate('submit', { preventDefault })

    expect(mockNavigate.mock.calls[0][0]).toBe('/user/wasd')
  })
})
