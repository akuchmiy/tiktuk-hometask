import { shallow } from 'enzyme'
import AmountChanger from 'shared/ui/AmountChanger'
import React from 'react'

describe('AmountChanger tests', function () {
  const mockSetAmount = jest.fn()

  it('button, that decreases must he disabled, when amount == minAmount', function () {
    const wrapper = shallow(
      <AmountChanger
        amount={1}
        maxAmount={3}
        minAmount={1}
        setAmount={mockSetAmount}
      />
    )

    expect(wrapper.find('button').at(0).prop('disabled')).toBe(false)
    expect(wrapper.find('button').at(1).prop('disabled')).toBe(true)
  })

  it('buttons must be enabled when amount !== maxColumns and !== minAmount', function () {
    const wrapper = shallow(
      <AmountChanger
        amount={2}
        maxAmount={3}
        minAmount={1}
        setAmount={mockSetAmount}
      />
    )

    expect(wrapper.find('button').at(0).prop('disabled')).toBe(false)
    expect(wrapper.find('button').at(1).prop('disabled')).toBe(false)
  })

  it('button, that increases must he disabled, when amount == maxAmount', function () {
    const wrapper = shallow(
      <AmountChanger
        amount={3}
        maxAmount={3}
        minAmount={1}
        setAmount={mockSetAmount}
      />
    )

    expect(wrapper.find('button').at(0).prop('disabled')).toBe(true)
    expect(wrapper.find('button').at(1).prop('disabled')).toBe(false)
  })

  it('first button click must call setAmount with amount+1', function () {
    const columns = 2
    const wrapper = shallow(
      <AmountChanger
        amount={columns}
        maxAmount={3}
        minAmount={1}
        setAmount={mockSetAmount}
      />
    )

    wrapper.find('button').at(0).simulate('click')

    expect(mockSetAmount).toBeCalledWith(columns + 1)
  })

  it('second button click must call setAmount with amount-1', function () {
    const columns = 2
    const wrapper = shallow(
      <AmountChanger
        amount={columns}
        maxAmount={3}
        minAmount={1}
        setAmount={mockSetAmount}
      />
    )

    wrapper.find('button').at(1).simulate('click')

    expect(mockSetAmount).toBeCalledWith(columns - 1)
  })
})
