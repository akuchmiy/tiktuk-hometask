import { OBSERVER_OPTIONS } from '../constants'

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

export const pauseVideos = (videos: HTMLVideoElement[]) => {
  videos.forEach((video) => pauseVideo(video))
}

export const scrollToVideo = (video: HTMLVideoElement) => {
  const { top, height } = video.getBoundingClientRect()
  window.scrollTo({
    top: top + window.scrollY - height / 5,
    left: 0,
    behavior: 'smooth',
  })
}

export const observeVideos = (
  videos: HTMLVideoElement[],
  onVideoIntersect: IntersectionObserverCallback
) => {
  const observer = new IntersectionObserver(onVideoIntersect, OBSERVER_OPTIONS)

  videos.forEach((video) => {
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
