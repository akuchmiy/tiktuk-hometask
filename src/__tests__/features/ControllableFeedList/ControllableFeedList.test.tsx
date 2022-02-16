import { mount, shallow } from 'enzyme'
import { ControllableFeedList } from 'features/ControllableFeedList'
import React from 'react'
import useSmallScreen from 'shared/hooks/useSmallScreen'
import { Feed } from 'shared/api'

jest.mock('shared/hooks/useSmallScreen')
jest.mock('entities/Feed', () => ({
  FeedList: function FeedList() {
    return 'FeedList'
  },
}))
jest.mock(
  'shared/ui/AmountChanger',
  () =>
    function AmountChanger() {
      return 'AmountChanger'
    }
)

const feedList = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
] as unknown as Feed[]

describe('ControllableFeedList tests', function () {
  let mockUseSmallScreen: jest.Mock

  beforeEach(() => {
    mockUseSmallScreen = useSmallScreen as jest.Mock
    mockUseSmallScreen.mockReturnValue(true)
  })

  it('should render ControllableFeedList without AmountChanger', function () {
    const wrapper = shallow(
      <ControllableFeedList showDescription={true} feedList={feedList} />
    )

    expect(wrapper.find('AmountChanger')).toHaveLength(0)
  })

  it('should render ControllableFeedList with AmountChanger', function () {
    mockUseSmallScreen.mockReturnValueOnce(false)
    const wrapper = shallow(
      <ControllableFeedList showDescription={true} feedList={feedList} />
    )

    expect(wrapper.find('AmountChanger')).toHaveLength(1)
  })

  it('should render with two columns', function () {
    mockUseSmallScreen.mockReturnValueOnce(false)
    const wrapper = shallow(
      <ControllableFeedList
        currentColumns={2}
        showDescription={true}
        feedList={feedList}
      />
    )

    expect(wrapper.find('FeedList').prop('columns')).toBe(2)
  })

  it('should change columns to 1 when useSmallScreen returns true', async function () {
    const wrapper = await mount(
      <ControllableFeedList
        currentColumns={2}
        showDescription={true}
        feedList={feedList}
      />
    )

    expect(wrapper.find('FeedList').prop('columns')).toBe(1)
  })

  it('should not change columns to 1 when useSmallScreen returns false', async function () {
    mockUseSmallScreen.mockReturnValueOnce(false)
    const wrapper = await mount(
      <ControllableFeedList
        currentColumns={2}
        showDescription={true}
        feedList={feedList}
      />
    )

    wrapper.setProps({})

    expect(wrapper.find('FeedList').prop('columns')).toBe(2)
  })
})
