import { ErrorTitle } from 'shared/ui/ErrorTitle'
import { shallow } from 'enzyme'

describe('ErrorTitle tests', function () {
  it('should show error message', function () {
    const wrapper = shallow(<ErrorTitle isError={true} />)

    expect(wrapper.text()).toBe('Something went wrong')
  })

  it('should not show error message', function () {
    const wrapper = shallow(
      <ErrorTitle isError={false}>Not an error</ErrorTitle>
    )

    expect(wrapper.text()).toBe('Not an error')
  })
})
