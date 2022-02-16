import React, { forwardRef } from 'react'
import { Feed } from 'shared/api'
import { useVideoControls } from '../model'
import { IS_INITIAL_PLAYING } from '../constants'

interface FeedVideoProps {
  feed: Feed
  className?: string
  onVideoEnd: () => void
}

export const FeedVideo = forwardRef<HTMLVideoElement, FeedVideoProps>(
  ({ feed, className = '', onVideoEnd }, ref) => {
    const { isPlaying, togglePlay } = useVideoControls(IS_INITIAL_PLAYING)

    const ariaLabel = isPlaying
      ? 'Press enter to stop the video'
      : 'Press enter to resume the video'

    return (
      <>
        <span id={`${feed.createTime}`} className={'visually-hidden'}>
          {feed.text}
        </span>
        <video
          onEnded={onVideoEnd}
          ref={ref}
          tabIndex={0}
          aria-label={ariaLabel}
          aria-describedby={`${feed.createTime}`}
          autoPlay={IS_INITIAL_PLAYING}
          onClick={togglePlay}
          onKeyPress={togglePlay}
          className={className}
          width={feed.videoMeta?.width}
          height={feed.videoMeta?.height}
        >
          <source src={feed.videoUrl} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </>
    )
  }
)

FeedVideo.displayName = 'FeedVideo'
