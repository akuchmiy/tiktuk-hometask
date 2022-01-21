import Enzyme, { shallow } from 'enzyme'
import UserInfo from 'components/UserInfo/UserInfo'
import { User, UserData, UserStats } from 'shared/api'

jest.mock('shared/lib', () => ({
  formatNumber(input: number) {
    return input
  },
}))

describe('UserInfo tests', function () {
  let wrapper: Enzyme.ShallowWrapper
  const numbers = [5, 12, 14]

  beforeEach(() => {
    const userData: UserData = {
      user: { verified: true } as User,
      stats: {
        followerCount: numbers[0],
        heart: numbers[1],
        followingCount: numbers[2],
      } as unknown as UserStats,
    }

    wrapper = shallow(<UserInfo userData={userData} />)
  })

  it('should render bold statistics if they are present in props', function () {
    wrapper.find('b').forEach((bold) => {
      expect(numbers).toContain(+bold.text())
    })
  })

  it('should render verified icon if user is verified', function () {
    expect(wrapper.find('FontAwesomeIcon').prop('icon')).toContain(
      'check-square'
    )
  })

  it('should not render verified icon if user is not verified', function () {
    const userData = { user: { verified: false } } as UserData
    wrapper = shallow(<UserInfo userData={userData} />)

    expect(wrapper.find('FontAwesomeIcon')).toHaveLength(0)
  })

  it('should render bold statistics with zeros if they are not present in props', function () {
    const userData = { user: {} } as UserData
    wrapper = shallow(<UserInfo userData={userData} />)

    wrapper.find('b').forEach((bold) => {
      expect(bold.text()).toBe('0')
    })
  })
})
