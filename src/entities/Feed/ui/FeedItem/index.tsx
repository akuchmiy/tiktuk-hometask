import React, { forwardRef } from 'react'
import { FeedDescription } from '../FeedDescription'
import { FeedStatistics } from '../FeedStatistics'
import { Feed } from 'shared/api'
import './index.css'
import { FeedVideo } from '../FeedVideo'

export interface FeedItemProps {
  feed: Feed
  showDescription?: boolean
  onVideoEnd: () => void
}

export const FeedItem = forwardRef<HTMLVideoElement, FeedItemProps>(
  ({ feed, showDescription = false, onVideoEnd }, ref) => {
    return (
      <div className={'flex flex-col mx-auto'}>
        {showDescription && (
          <FeedDescription
            authorMeta={feed.authorMeta}
            hashtags={feed.hashtags}
            text={feed.text}
          />
        )}
        <div
          className={
            'group center relative ring-2 ring-offset-3 ring-pink-400 dark:ring-gray-100 shadow-2xl rounded-xl overflow-hidden'
          }
        >
          <FeedVideo
            className={`video object-cover cursor-pointer`}
            feed={feed}
            ref={ref}
            onVideoEnd={onVideoEnd}
          />
          <FeedStatistics
            className={
              'absolute bottom-5 right-2 transform translate-x-20 group-hover:translate-x-0 group-focus:translate-x-0 transition-transform'
            }
            feed={feed}
          />
        </div>
      </div>
    )
  }
)

FeedItem.displayName = 'FeedItem'
