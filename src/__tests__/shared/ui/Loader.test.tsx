import { shallow } from 'enzyme'
import Loader from 'shared/ui/Loader'

describe('Loader tests', function () {
  it('should not render text', function () {
    const wrapper = shallow(<Loader isLoading={true}>some text</Loader>)

    expect(wrapper.text()).not.toBe('some text')
  })

  it('should not render text without an isLoading prop', function () {
    const wrapper = shallow(<Loader>some text</Loader>)

    expect(wrapper.text()).not.toBe('some text')
  })

  it('should render text', function () {
    const wrapper = shallow(<Loader isLoading={false}>some text</Loader>)

    expect(wrapper.text()).toBe('some text')
  })
})
