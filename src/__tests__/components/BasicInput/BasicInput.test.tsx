import { shallow } from 'enzyme'
import BasicInput from 'components/BasicInput/BasicInput'

describe('BasicInput tests', () => {
  it('should render input with text type', function () {
    const input = shallow(<BasicInput />)

    expect(input.containsMatchingElement(<input type="text" />)).toBe(true)
  })

  it('should render input with different type', function () {
    const input = shallow(<BasicInput type={'number'} />)

    expect(input.containsMatchingElement(<input type="number" />)).toBe(true)
  })

  it('should pass rest props to the input', function () {
    const input = shallow(
      <BasicInput aria-label={'foo'} aria-controls={'bar'} />
    )

    expect(
      input.containsMatchingElement(
        <input aria-label={'foo'} aria-controls={'bar'} />
      )
    ).toBe(true)
  })

  it('should call onChange function', () => {
    const onChange = jest.fn()
    const input = shallow(<BasicInput onChange={onChange} />)

    input.find('input').simulate('change')

    expect(onChange).toBeCalledTimes(1)
  })
})
