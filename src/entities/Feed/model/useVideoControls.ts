import React, { useCallback, useState } from 'react'
import { toggleVideo } from '../lib'

export function useVideoControls(isInitialPlaying: boolean) {
  const [isPlaying, setIsPlaying] = useState(isInitialPlaying)

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

  return { isPlaying, togglePlay, setIsPlaying }
}
