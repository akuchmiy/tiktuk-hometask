import { useEffect, useState } from 'react'
import { SMALL_SCREEN_BREAKPOINT } from 'shared/constants'

export default function useSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const listener = () => {
      if (window.innerWidth < SMALL_SCREEN_BREAKPOINT && !isSmallScreen) {
        setIsSmallScreen(true)
      } else if (
        window.innerWidth >= SMALL_SCREEN_BREAKPOINT &&
        isSmallScreen
      ) {
        setIsSmallScreen(false)
      }
    }
    listener()
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [isSmallScreen, setIsSmallScreen])

  return isSmallScreen
}
