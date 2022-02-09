import React, { useMemo } from 'react'
import Layouts from 'layouts'
import { ControllableFeedList } from 'features/ControllableFeedList'
import Loader from 'shared/ui/Loader'
import { Feed } from 'shared/api'
import { useTitle } from 'shared/hooks/useTitle'
import useQuery from 'shared/hooks/useQuery'
import { feedModel } from 'entities/Feed'

import { ErrorTitle } from 'shared/ui/ErrorTitle'

const Home = () => {
  const query = useQuery()
  const queryParam = useMemo(() => query.get('query'), [query])
  const { feed, error, isLoading } = feedModel.useFeed(undefined, queryParam)

  const newTitle = useMemo(() => {
    if (!queryParam) return 'Trending'

    return `Trending for "${queryParam}"`
  }, [queryParam])

  useTitle(newTitle)

  return (
    <Layouts.Main>
      <ErrorTitle className={'pl-7 mb-6 md:mb-16'} isError={!!error}>
        {newTitle}
      </ErrorTitle>
      {!error && (
        <Loader isLoading={isLoading || !feed}>
          <ControllableFeedList
            showDescription={true}
            currentColumns={1}
            minColumns={1}
            maxColumns={2}
            feedList={feed as Feed[]}
          />
        </Loader>
      )}
    </Layouts.Main>
  )
}

export default Home
