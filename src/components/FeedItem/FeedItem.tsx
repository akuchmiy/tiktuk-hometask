import React, { forwardRef, useCallback, useState } from 'react'
import FeedDescription from './FeedDescription'
import VideoStatistics from './VideoStatistics'
import { Feed } from 'shared/api'
import './feedItem.css'

export interface FeedItemProps {
  feed: Feed
  showDescription?: boolean
  onVideoEnd: () => void
}

const FeedItem = forwardRef<HTMLVideoElement, FeedItemProps>(
  ({ feed, showDescription = false, onVideoEnd }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false)

    const playVideo = useCallback(
      async (
        event:
          | React.MouseEvent<HTMLVideoElement>
          | React.KeyboardEvent<HTMLVideoElement>
      ) => {
        if (
          event.nativeEvent instanceof KeyboardEvent &&
          event.nativeEvent?.key !== 'Enter'
        )
          return

        const video = event.target as HTMLVideoElement
        if (video.paused) {
          try {
            await video.play()
            setIsPlaying(true)
          } catch (e) {}
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      [setIsPlaying]
    )

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
          <span id={`${feed.createTime}`} className={'visually-hidden'}>
            {feed.text}
          </span>
          <video
            onEnded={onVideoEnd}
            ref={ref}
            tabIndex={0}
            aria-label={
              isPlaying
                ? 'Press enter to stop the video'
                : 'Press enter to resume the video'
            }
            aria-describedby={`${feed.createTime}`}
            autoPlay={false}
            onClick={playVideo}
            onKeyPress={playVideo}
            className={`video object-cover cursor-pointer`}
            {...feed.videoMeta}
          >
            <source src={feed.videoUrl} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
          <VideoStatistics
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

export default FeedItem
