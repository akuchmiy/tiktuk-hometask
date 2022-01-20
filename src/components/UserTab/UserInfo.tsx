import React, { FC, useMemo } from 'react'
import { UserData } from 'shared/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatNumber } from '../../shared/lib'

interface UserInfoProps {
  userData: UserData | null
}

const UserInfo: FC<UserInfoProps> = ({ userData }) => {
  const { likes, followers, following } = useMemo(() => {
    const stats = userData?.stats
    if (stats) {
      return {
        likes: formatNumber(stats.heart, 1),
        followers: formatNumber(stats.followerCount, 1),
        following: formatNumber(stats.followingCount, 1),
      }
    }
    return { likes: '0', followers: '0', following: '0' }
  }, [userData])

  return (
    <div className={'mb-6 md:mb-12'}>
      <div
        className={
          'items-center text-center sm:text-left flex flex-col sm:flex-row'
        }
      >
        <div
          className={
            'w-52 sm:w-32 md:w-48 h-52 sm:h-32 md:h-48 mb-4 sm:mb-0 sm:mr-5 rounded-3xl shadow-lg'
          }
        >
          <div className={'w-full h-full overflow-hidden rounded-3xl'}>
            <img
              className={'object-cover'}
              src={userData?.user.avatarMedium}
              alt={`${userData?.user.uniqueId} avatar`}
            />
          </div>
        </div>
        <div>
          <div className={'mb-4'}>
            <h2 className={'text-3xl md:text-5xl mb-3'}>
              <span>{userData?.user.nickname}</span>
              {userData?.user.verified && (
                <FontAwesomeIcon
                  className={'ml-4'}
                  icon={['fas', 'check-square']}
                />
              )}
            </h2>
            <p
              className={
                'text-xl md:text-3xl sm:max-w-sm md:max-w-md xl:max-w-2xl break-words'
              }
            >
              {userData?.user.signature}
            </p>
          </div>
          <ul
            className={
              'flex justify-center sm:justify-start gap-x-4 flex-wrap text-base md:text-xl'
            }
          >
            <li>
              <span>
                Followers: <b>{followers}</b>
              </span>
            </li>
            <li>
              <span>
                Likes: <b>{likes}</b>
              </span>
            </li>
            <li>
              <span>
                Following: <b>{following}</b>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
