import React, { FC, useCallback } from 'react'
import Layouts from 'layouts'
import { useParams } from 'react-router-dom'
import WithDataFeedList from 'components/FeedList/WithDataFeedList'
import UserInfo from 'components/UserInfo/UserInfo'
import Loader from 'shared/ui/Loader'
import { UserData, getUserInfo } from 'shared/api'
import useAsync from 'shared/hooks/useAsync'

const UserTab: FC = () => {
  const { username } = useParams<'username'>()

  const fetchUserInfo = useCallback(() => {
    return getUserInfo(username as string)
  }, [username])

  const { data, error, isLoading } = useAsync<UserData>(fetchUserInfo)

  return (
    <Layouts.Main>
      {error ? (
        <h1 className={'text-center m-auto text-4xl'}>Something went wrong</h1>
      ) : (
        <Loader isLoading={isLoading || !data}>
          <WithDataFeedList currentColumns={3} username={username}>
            <UserInfo userData={data} />
          </WithDataFeedList>
        </Loader>
      )}
    </Layouts.Main>
  )
}

export default UserTab
