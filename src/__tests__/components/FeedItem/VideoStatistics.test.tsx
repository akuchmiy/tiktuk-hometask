import { shallow } from 'enzyme'
import VideoStatistics from '../../../components/FeedItem/VideoStatistics'
import { Feed } from '../../../domain/Feed'

jest.mock('../../../services/NumberService', () => ({
  formatNumber: (input: number) => input,
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
