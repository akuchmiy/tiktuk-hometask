import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WithDataFeedList from 'components/FeedList/WithDataFeedList'
import UserInfo from './UserInfo'
import { UserData, getUserInfo } from 'shared/api'
import Loader from 'shared/ui/Loader'

const UserTab: FC = () => {
  const { username } = useParams<'username'>()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setUserData(null)
    ;(async () => {
      if (!username) {
        return setIsError(true)
      }

      const data = await getUserInfo(username)
      if (!data) setIsError(true)
      setUserData(data)
    })()
  }, [username])

  return (
    <>
      {isError ? (
        <h1 className={'text-center m-auto text-4xl'}>Something went wrong</h1>
      ) : (
        <Loader isLoading={!userData}>
          <WithDataFeedList currentColumns={3} username={username}>
            <UserInfo userData={userData} />
          </WithDataFeedList>
        </Loader>
      )}
    </>
  )
}

export default UserTab
