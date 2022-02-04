import useQuery from 'shared/hooks/useQuery'
import { shallow } from 'enzyme'
import React from 'react'

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    search: '?lol=5&kek=6',
  }),
}))

function UseQueryWrapper() {
  const query = useQuery()

  return <span>{query.get('lol')}</span>
}

describe('useQuery tests', function () {
  it('should render span with 5 as text', function () {
    const wrapper = shallow(<UseQueryWrapper />)
    expect(wrapper.find('span').text()).toBe('5')
  })
})
