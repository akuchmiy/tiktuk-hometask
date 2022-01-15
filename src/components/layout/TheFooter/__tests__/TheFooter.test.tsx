import { shallow } from 'enzyme'
import TheFooter from '../TheFooter'

describe('TheFooter tests', () => {
  it('should contain application name', () => {
    const footer = shallow(<TheFooter />)

    expect(footer.text()).toContain(`Tik Tuk`)
  })
})
