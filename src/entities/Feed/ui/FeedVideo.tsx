import React, { forwardRef, useCallback, useState } from 'react'
import { Feed } from 'shared/api'
import { toggleVideo } from '../lib'

interface FeedVideoProps {
  feed: Feed
  className?: string
  onVideoEnd: () => void
}

export const FeedVideo = forwardRef<HTMLVideoElement, FeedVideoProps>(
  ({ feed, className = '', onVideoEnd }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = useCallback(
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
        const playing = await toggleVideo(video)

        setIsPlaying(playing)
      },
      [setIsPlaying]
    )
    return (
      <>
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
          onClick={togglePlay}
          onKeyPress={togglePlay}
          className={className}
          {...feed.videoMeta}
        >
          <source src={feed.videoUrl} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </>
    )
  }
)

FeedVideo.displayName = 'FeedVideo'
