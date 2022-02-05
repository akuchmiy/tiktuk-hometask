import { shallow } from 'enzyme'
import Input from 'shared/ui/Input'

describe('Input tests', () => {
  it('should render input with text type', function () {
    const input = shallow(<Input />)

    expect(input.containsMatchingElement(<input type="text" />)).toBe(true)
  })

  it('should render input with different type', function () {
    const input = shallow(<Input type={'number'} />)

    expect(input.containsMatchingElement(<input type="number" />)).toBe(true)
  })

  it('should pass rest props to the input', function () {
    const input = shallow(<Input aria-label={'foo'} aria-controls={'bar'} />)

    expect(
      input.containsMatchingElement(
        <input aria-label={'foo'} aria-controls={'bar'} />
      )
    ).toBe(true)
  })

  it('should call onChange function', () => {
    const onChange = jest.fn()
    const input = shallow(<Input onChange={onChange} />)

    input.find('input').simulate('change')

    expect(onChange).toBeCalledTimes(1)
  })
})
