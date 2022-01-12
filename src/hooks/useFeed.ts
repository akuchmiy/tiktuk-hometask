import { useCallback, useEffect, useState } from 'react'
import FeedService from '../services/FeedService'
import { Feed } from '../models/Feed'

function useFeed(
  username: string | undefined,
  queryParam: string | null
): [Feed[], boolean] {
  const [feedList, setFeedList] = useState<Feed[]>([])
  const [isError, setIsError] = useState(false)

  const fetchFeed = useCallback(() => {
    if (username && process.env.NODE_ENV === 'production')
      return FeedService.getUserFeed(username)
    if (queryParam) return FeedService.getHashtagFeed(queryParam)

    return FeedService.getTrendingFeed()
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
