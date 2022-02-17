import { useEffect } from 'react'
import { OBSERVE_WHEN_COLUMNS } from '../constants'
import { observeVideos, pauseVideo, pauseVideos, playVideo } from '../lib'

export function useVideoScroll(videos: HTMLVideoElement[], columns: number) {
  useEffect(() => {
    if (!OBSERVE_WHEN_COLUMNS.includes(columns)) return

    const onVideoIntersect = async (entries: IntersectionObserverEntry[]) => {
      const { target, isIntersecting } = entries[0]
      const video = target as HTMLVideoElement

      if (!isIntersecting) return pauseVideo(video)

      pauseVideos(videos)
      return playVideo(video)
    }

    const observer = observeVideos(videos, onVideoIntersect)

    return () => observer.disconnect()
  }, [videos, columns])
}
