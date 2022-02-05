import React from 'react'

export const playVideo = async (video: HTMLVideoElement) => {
  try {
    await video.play()
    return true
  } catch (e) {
    return false
  }
}

export const pauseVideo = (video: HTMLVideoElement) => {
  video.pause()

  return false
}

export const toggleVideo = async (
  video: HTMLVideoElement
): Promise<boolean> => {
  if (!video.paused) return pauseVideo(video)

  return playVideo(video)
}

export const pauseVideos = (
  videos: React.MutableRefObject<HTMLVideoElement[]>
) => {
  videos.current.forEach((video) => pauseVideo(video))
}

export const scrollToVideo = (video: HTMLVideoElement) => {
  const rect = video.getBoundingClientRect()
  window.scrollTo({
    top: rect.top + window.scrollY - rect.height / 5,
    left: 0,
    behavior: 'smooth',
  })
}

export const observeVideos = (
  videos: React.MutableRefObject<HTMLVideoElement[]>,
  onVideoIntersect: IntersectionObserverCallback
) => {
  const observer = new IntersectionObserver(onVideoIntersect, {
    threshold: 0.5,
  })

  videos.current.forEach((video) => {
    if (video instanceof HTMLVideoElement) {
      observer.observe(video)
    }
  })

  return observer
}

export const trimHashtags = (text: string) => {
  const firstHashIndex = text.indexOf('#')
  if (firstHashIndex === -1) return text

  return text.slice(0, firstHashIndex)
}
