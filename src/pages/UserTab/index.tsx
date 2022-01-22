import React, { FC, useCallback, useMemo } from 'react'
import Layouts from 'layouts'
import { ControllableFeedList } from 'features/ControllableFeedList'
import { ErrorTitle } from 'shared/ui/ErrorTitle'
import UserInfo from 'components/UserInfo/UserInfo'
import Loader from 'shared/ui/Loader'
import { UserData, getUserInfo, Feed } from 'shared/api'
import { useAsync } from 'shared/hooks/useAsync'
import { useTitle } from 'shared/hooks/useTitle'
import { useParams } from 'react-router-dom'
import useFeed from 'hooks/useFeed'

const UserTab: FC = () => {
  const { username } = useParams<'username'>()

  const fetchUserInfo = useCallback(() => {
    return getUserInfo(username as string)
  }, [username])

  const {
    data,
    error: userError,
    isLoading: userIsLoading,
  } = useAsync<UserData>(fetchUserInfo)
  const {
    feed,
    error: feedError,
    isLoading: feedIsLoading,
  } = useFeed(username, null)
  const isError = userError || feedError
  const isLoading = userIsLoading || feedIsLoading

  const newTitle = useMemo(() => `${username}'s profile`, [username])
  useTitle(newTitle)

  return (
    <Layouts.Main>
      <ErrorTitle className={'pl-7 mb-6 md:mb-16'} isError={!!isError}>
        {newTitle}
      </ErrorTitle>
      {!isError && (
        <Loader isLoading={isLoading}>
          <UserInfo userData={data} />
          <ControllableFeedList
            showDescription={false}
            currentColumns={3}
            minColumns={1}
            maxColumns={3}
            feedList={feed as Feed[]}
          />
        </Loader>
      )}
    </Layouts.Main>
  )
}

export default UserTab
