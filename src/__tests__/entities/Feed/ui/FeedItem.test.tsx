import Enzyme, { shallow } from 'enzyme'
import { FeedItem } from 'entities/Feed/ui/FeedItem'
import { Feed } from 'shared/api'

const feed: Feed = {} as Feed

describe('FeedItem tests', function () {
  let wrapper: Enzyme.ShallowWrapper
  let onVideoEnded = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <FeedItem showDescription={true} onVideoEnd={onVideoEnded} feed={feed} />
    )
  })

  it('should hide description if showDescription prop is false or not present', function () {
    wrapper = shallow(<FeedItem onVideoEnd={jest.fn()} feed={feed} />)

    expect(wrapper.find('FeedDescription').length).toBe(0)
  })

  it('should show description if showDescription prop is true', function () {
    expect(wrapper.find('FeedDescription').length).toBe(1)
  })
})
