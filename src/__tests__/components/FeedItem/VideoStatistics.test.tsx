import { shallow } from 'enzyme'
import VideoStatistics from 'components/FeedItem/VideoStatistics'
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

describe('VideoStatistics tests', function () {
  it('should match snapshot', function () {
    const wrapper = shallow(<VideoStatistics feed={feed} />)

    expect(wrapper.debug()).toMatchSnapshot()
  })
})
