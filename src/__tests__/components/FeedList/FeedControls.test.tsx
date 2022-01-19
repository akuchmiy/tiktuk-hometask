import { shallow } from 'enzyme'
import FeedControls from 'components/FeedList/FeedControls'

describe('', function () {
  const mockSetColumns = jest.fn()

  it('button, that decreases must he disabled, when columns == minColumns', function () {
    const wrapper = shallow(
      <FeedControls
        columns={1}
        maxColumns={3}
        minColumns={1}
        setColumns={mockSetColumns}
      />
    )

    expect(wrapper.find('button').at(0).prop('disabled')).toBe(false)
    expect(wrapper.find('button').at(1).prop('disabled')).toBe(true)
  })

  it('buttons must be enabled when columns !== maxColumns and !== minColumns', function () {
    const wrapper = shallow(
      <FeedControls
        columns={2}
        maxColumns={3}
        minColumns={1}
        setColumns={mockSetColumns}
      />
    )

    expect(wrapper.find('button').at(0).prop('disabled')).toBe(false)
    expect(wrapper.find('button').at(1).prop('disabled')).toBe(false)
  })

  it('button, that increases must he disabled, when columns == maxColumns', function () {
    const wrapper = shallow(
      <FeedControls
        columns={3}
        maxColumns={3}
        minColumns={1}
        setColumns={mockSetColumns}
      />
    )

    expect(wrapper.find('button').at(0).prop('disabled')).toBe(true)
    expect(wrapper.find('button').at(1).prop('disabled')).toBe(false)
  })

  it('first button click must call setColumns with columns+1', function () {
    const columns = 2
    const wrapper = shallow(
      <FeedControls
        columns={columns}
        maxColumns={3}
        minColumns={1}
        setColumns={mockSetColumns}
      />
    )

    wrapper.find('button').at(0).simulate('click')

    expect(mockSetColumns).toBeCalledWith(columns + 1)
  })

  it('second button click must call setColumns with columns-1', function () {
    const columns = 2
    const wrapper = shallow(
      <FeedControls
        columns={columns}
        maxColumns={3}
        minColumns={1}
        setColumns={mockSetColumns}
      />
    )

    wrapper.find('button').at(1).simulate('click')

    expect(mockSetColumns).toBeCalledWith(columns - 1)
  })
})
