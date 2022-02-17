import React, { FC, memo, useEffect, useRef } from 'react'
import { Feed } from 'shared/api'
import { FeedItem } from 'entities/Feed/ui/FeedItem'
import { playVideo, scrollToVideo } from '../lib'
import { useVideoScroll } from '../model/useVideoScroll'

export interface FeedListProps {
  className?: string
  feedList: Feed[]
  showDescription?: boolean
  columns: number
}

export const FeedList: FC<FeedListProps> = memo(
  ({ feedList, className = '', showDescription = false, columns }) => {
    const videoRefs = useRef<HTMLVideoElement[]>([])

    const onVideoEnd = async (endedVideoIndex: number) => {
      const nextVideoIndex = endedVideoIndex + 1
      if (nextVideoIndex >= videoRefs.current.length) return

      const nextVideo = videoRefs.current[nextVideoIndex]

      await playVideo(nextVideo)
      scrollToVideo(nextVideo)
    }

    useVideoScroll(videoRefs.current, columns)

    useEffect(() => {
      videoRefs.current = videoRefs.current.slice(0, feedList.length)
    }, [feedList])

    return (
      <div className={`grid grid-cols-${columns} ${className}`}>
        {feedList.map((feed, index) => (
          <FeedItem
            ref={(el) => (videoRefs.current[index] = el as HTMLVideoElement)}
            showDescription={showDescription}
            key={feed.id}
            feed={feed}
            onVideoEnd={() => onVideoEnd(index)}
          />
        ))}
      </div>
    )
  }
)
