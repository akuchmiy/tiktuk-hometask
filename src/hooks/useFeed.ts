import { useCallback } from 'react'
import { Feed, getHashtagFeed, getTrendingFeed, getUserFeed } from 'shared/api'
import { useAsync } from 'shared/hooks/useAsync'

function useFeed(username: string | undefined, queryParam: string | null) {
  const fetchFeed = useCallback(() => {
    if (username && process.env.NODE_ENV === 'production')
      return getUserFeed(username)
    if (queryParam) return getHashtagFeed(queryParam)

    return getTrendingFeed()
  }, [username, queryParam])

  const { data, error, isLoading, execute } = useAsync<Feed[], Error>(fetchFeed)

  return { feed: data, error, isLoading, execute }
}

export default useFeed
