import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { Feed } from 'shared/api'
import FeedItem from 'components/FeedItem/FeedItem'
import AmountChanger from 'shared/ui/AmountChanger'
import useSmallScreen from 'shared/hooks/useSmallScreen'

export interface FeedListProps {
  className?: string
  feedList: Feed[]
  currentColumns?: number
  minColumns?: number
  maxColumns?: number
  showDescription?: boolean
}

const FeedList: FC<FeedListProps> = memo(
  ({
    feedList,
    className,
    currentColumns = 1,
    minColumns = 1,
    maxColumns = 3,
    showDescription = false,
  }) => {
    const [columns, setColumns] = useState<number>(currentColumns)
    const isSmallScreen = useSmallScreen()
    const videoRefs = useRef<HTMLVideoElement[]>([])

    const onVideoEnd = async (index: number) => {
      if (index + 1 >= videoRefs.current.length) return

      const nextVideo = videoRefs.current[index + 1]
      try {
        await nextVideo.play()
      } catch (e) {}

      const rect = nextVideo.getBoundingClientRect()
      window.scrollTo({
        top: rect.top + window.scrollY - rect.height / 5,
        left: 0,
        behavior: 'smooth',
      })
    }

    useEffect(() => {
      const callback = async (entries: IntersectionObserverEntry[]) => {
        if (columns !== 1) return
        const entry = entries[0]
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          videoRefs.current.forEach((vid) => vid.pause())
          try {
            await video.play()
          } catch (e) {}
        } else {
          video.pause()
        }
      }
      const observer = new IntersectionObserver(callback, {
        threshold: 0.5,
      })
      videoRefs.current.forEach((videoElem) => {
        if (videoElem instanceof Element) {
          observer.observe(videoElem)
        }
      })
      return () => observer.disconnect()
    }, [feedList, columns])

    useEffect(() => {
      videoRefs.current = videoRefs.current.slice(0, feedList.length)
    }, [feedList])

    useEffect(() => {
      if (isSmallScreen) setColumns(1)
    }, [isSmallScreen])

    return (
      <div className={`grid grid-cols-${columns} ${className}`}>
        {feedList.map((feed, index) => (
          <FeedItem
            ref={(el) => (videoRefs.current[index] = el as HTMLVideoElement)}
            showDescription={showDescription || columns !== maxColumns}
            key={feed.id}
            feed={feed}
            onVideoEnd={() => onVideoEnd(index)}
          />
        ))}
        {!isSmallScreen && (
          <AmountChanger
            minAmount={minColumns}
            maxAmount={maxColumns}
            setAmount={setColumns}
            amount={columns}
            className={
              'fixed top-1/3 right-2 p-1 flex flex-col text-xl bg-pink-200 border-2 border-pink-300 rounded-2xl text-gray-700 ' +
              'dark:text-gray-100 dark:bg-gray-700 dark:border-gray-300'
            }
          />
        )}
      </div>
    )
  }
)

export default FeedList
