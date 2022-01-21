import { FC } from 'react'
import useAsync from 'shared/hooks/useAsync'
import Enzyme, { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

interface UseAsyncWrapperProps {
  immediate: boolean
}

describe('useAsync tests', function () {
  let UseAsyncWrapper: FC<UseAsyncWrapperProps>
  let mockFetch: jest.Mock<Promise<string>>

  beforeEach(() => {
    mockFetch = jest.fn().mockResolvedValue('string')

    UseAsyncWrapper = ({ immediate }) => {
      const { error, data, isLoading } = useAsync<string>(mockFetch, immediate)

      return (
        <>
          <span className={'error'}>{error}</span>
          <span className={'data'}>{data}</span>
          <span className={'loading'}>{isLoading ? 'true' : 'false'}</span>
        </>
      )
    }
  })

  it('should return isLoading as true at first', async function () {
    const wrapper = await mount(<UseAsyncWrapper immediate={true} />)

    expect(wrapper.find('.loading').text()).toBe('true')
    expect(wrapper.find('.data').text()).toBe('')
    expect(wrapper.find('.error').text()).toBe('')
  })

  it('should return data after render when immediate is true', async function () {
    let wrapper: Enzyme.ReactWrapper
    await act(async () => {
      wrapper = await mount(<UseAsyncWrapper immediate={true} />)
    })

    wrapper.setProps({})

    expect(wrapper.find('.data').text()).toBe('string')
    expect(mockFetch).toBeCalledTimes(1)
  })

  it('should return error when function throws', async function () {
    mockFetch.mockRejectedValue('some error')
    let wrapper: Enzyme.ReactWrapper
    await act(async () => {
      wrapper = await mount(<UseAsyncWrapper immediate={true} />)
    })

    wrapper.setProps({})

    expect(wrapper.find('.data').text()).toBe('')
    expect(wrapper.find('.error').text()).toBe('some error')
  })

  it('should not render when immediate is false', async function () {
    let wrapper: Enzyme.ReactWrapper
    await act(async () => {
      wrapper = await mount(<UseAsyncWrapper immediate={false} />)
    })

    wrapper.setProps({})

    expect(wrapper.find('.loading').text()).toBe('true')
    expect(wrapper.find('.data').text()).toBe('')
    expect(wrapper.find('.error').text()).toBe('')
  })
})
