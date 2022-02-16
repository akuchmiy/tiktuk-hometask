import { shallow } from 'enzyme'
import { FeedStatistics } from 'entities/Feed/ui/FeedStatistics'
import { Feed } from 'shared/api'

jest.mock('shared/lib', () => ({
  formatNumber(input: number) {
    return input
  },
}))

const feed: Feed = {
  diggCount: 50,
  commentCount: 100,
} as Feed

describe('FeedStatistics tests', function () {
  it('should match snapshot', function () {
    const wrapper = shallow(<FeedStatistics feed={feed} />)

    expect(wrapper.debug()).toMatchSnapshot()
  })
})
