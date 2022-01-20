import { useCallback, useEffect, useState } from 'react'
import { Feed } from 'domain/Feed'
import { getHashtagFeed, getTrendingFeed, getUserFeed } from 'shared/api'

function useFeed(
  username: string | undefined,
  queryParam: string | null
): [Feed[], boolean] {
  const [feedList, setFeedList] = useState<Feed[]>([])
  const [isError, setIsError] = useState(false)

  const fetchFeed = useCallback(() => {
    if (username && process.env.NODE_ENV === 'production')
      return getUserFeed(username)
    if (queryParam) return getHashtagFeed(queryParam)

    return getTrendingFeed()
  }, [username, queryParam])

  useEffect(() => {
    setIsError(false)
    setFeedList([])
    ;(async () => {
      const data = await fetchFeed()

      if (data.length === 0) setIsError(true)
      setFeedList(data)
    })()
  }, [fetchFeed, setFeedList])

  return [feedList, isError]
}

export default useFeed
