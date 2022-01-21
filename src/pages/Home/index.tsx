import React from 'react'
import Layouts from 'layouts'
import WithDataFeedList from 'components/FeedList/WithDataFeedList'

const Home = () => {
  return (
    <Layouts.Main>
      <WithDataFeedList maxColumns={2} showDescription={true} />
    </Layouts.Main>
  )
}

export default Home
