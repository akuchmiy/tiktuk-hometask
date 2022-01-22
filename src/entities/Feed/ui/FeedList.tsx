import React, { FC, memo, useEffect, useRef } from 'react'
import { Feed } from 'shared/api'
import { FeedItem } from 'entities/Feed/ui/FeedItem'
import {
  observeVideos,
  pauseVideo,
  pauseVideos,
  playVideo,
  scrollToVideo,
} from '../lib'

export interface FeedListProps {
  className?: string
  feedList: Feed[]
  showDescription?: boolean
  columns: number
}

export const FeedList: FC<FeedListProps> = memo(
  ({ feedList, className = '', showDescription = false, columns }) => {
    const videoRefs = useRef<HTMLVideoElement[]>([])

    const onVideoEnd = async (index: number) => {
      if (index + 1 >= videoRefs.current.length) return

      const nextVideo = videoRefs.current[index + 1]

      await playVideo(nextVideo)
      scrollToVideo(nextVideo)
    }

    useEffect(() => {
      const onVideoIntersect = async (entries: IntersectionObserverEntry[]) => {
        if (columns !== 1) return

        const entry = entries[0]
        const video = entry.target as HTMLVideoElement

        if (!entry.isIntersecting) return pauseVideo(video)

        pauseVideos(videoRefs)
        return playVideo(video)
      }

      const observer = observeVideos(videoRefs, onVideoIntersect)

      return () => observer.disconnect()
    }, [feedList, columns])

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
