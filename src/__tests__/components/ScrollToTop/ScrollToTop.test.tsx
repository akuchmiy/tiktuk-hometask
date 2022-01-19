import Enzyme, { mount } from 'enzyme'
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop'
import { act } from 'react-dom/test-utils'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}))

describe('ScrollToTop tests', function () {
  let wrapper: Enzyme.ReactWrapper
  let addListener: jest.SpyInstance
  let removeListener: jest.SpyInstance
  let scrollTo: jest.Mock
  const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY')
  const originalInnerHeight = Object.getOwnPropertyDescriptor(
    window,
    'innerHeight'
  )
  const originalScrollTo = Object.getOwnPropertyDescriptor(window, 'scrollTo')

  beforeEach(async () => {
    addListener = jest.spyOn(window, 'addEventListener')
    removeListener = jest.spyOn(window, 'removeEventListener')
    scrollTo = jest.fn()

    Object.defineProperty(window, 'scrollY', { value: 100 })
    Object.defineProperty(window, 'innerHeight', { value: 1 })
    Object.defineProperty(window, 'scrollTo', { value: scrollTo })

    wrapper = await mount(<ScrollToTop />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  afterAll(() => {
    Object.defineProperty(
      window,
      'scrollY',
      originalScrollY as PropertyDescriptor
    )
    Object.defineProperty(
      window,
      'innerHeight',
      originalInnerHeight as PropertyDescriptor
    )
    Object.defineProperty(
      window,
      'scrollTo',
      originalScrollTo as PropertyDescriptor
    )
  })

  it('should attach onscroll listener', async function () {
    expect(addListener.mock.calls.filter(filterOnScrollListener)).toHaveLength(
      1
    )
  })

  it('should not render button', function () {
    expect(wrapper.find('button')).toHaveLength(0)
  })

  it('should attach a new listener and remove previous on `visible` state change', async function () {
    act(() => {
      addListener.mock.calls.find(filterOnScrollListener)[1]()
    })

    wrapper.setProps({})

    expect(addListener.mock.calls.filter(filterOnScrollListener)).toHaveLength(
      2
    )
    expect(
      removeListener.mock.calls.filter(filterOnScrollListener)
    ).toHaveLength(1)
  })

  it('should scroll to top on button click', function () {
    act(() => {
      addListener.mock.calls.find(filterOnScrollListener)[1]()
    })

    wrapper.setProps({})
    wrapper.find('button').simulate('click')

    expect(scrollTo).toBeCalledTimes(1)
  })

  it('should hide button when scrollY is less then window.innerHeight', function () {
    act(() => {
      addListener.mock.calls.find(filterOnScrollListener)[1]()
    })

    Object.defineProperty(window, 'scrollY', { value: 1 })
    Object.defineProperty(window, 'innerHeight', { value: 100 })

    act(() => {
      addListener.mock.calls.filter(filterOnScrollListener).pop()[1]()
    })

    wrapper.setProps({})

    expect(wrapper.find('button')).toHaveLength(0)
  })
})

function filterOnScrollListener(call: jest.MockContext<any, any>['calls'][0]) {
  return call[0] === 'scroll'
}
