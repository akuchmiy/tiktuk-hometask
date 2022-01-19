import { shallow } from 'enzyme'
import FeedDescription from 'components/FeedItem/FeedDescription'
import { AuthorMeta } from 'domain/AuthorMeta'
import { Hashtag } from 'domain/Feed'

const authorMeta: AuthorMeta = {
  id: '1',
  avatar: 'avatar',
  fans: 15,
  name: 'Dima',
  following: 4,
  heart: 3000,
  video: 6,
}

const text = 'text #lol #kek'
const hashTags: Hashtag[] = [
  { id: '1', name: 'lol' },
  { id: '2', name: 'kek' },
]

describe('FeedDescription tests', function () {
  it('should render all hashtags in strong tags', function () {
    const wrapper = shallow(
      <FeedDescription
        text={'text'}
        hashtags={hashTags}
        authorMeta={authorMeta}
      />
    )

    wrapper.find('strong').forEach((strongTag, index) => {
      const hashtagByIndex = hashTags[index]
      expect(strongTag.text()).toContain(hashtagByIndex.name)
    })
  })

  it('paragraph should not contain any #', function () {
    const wrapper = shallow(
      <FeedDescription
        text={text}
        hashtags={hashTags}
        authorMeta={authorMeta}
      />
    )

    expect(wrapper.find('p').childAt(0).text()).not.toContain('#')
  })
})
