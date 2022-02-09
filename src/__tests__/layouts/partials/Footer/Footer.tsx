import { shallow } from 'enzyme'
import Footer from 'layouts/partials/Footer'
import React from 'react'

describe('Footer tests', () => {
  it('should contain application name', () => {
    const footer = shallow(<Footer />)

    expect(footer.text()).toContain(`Tik Tuk`)
  })
})
