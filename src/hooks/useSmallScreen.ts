import { useEffect, useState } from 'react'
import configService from '../config/configService'

export default function useSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const listener = () => {
      if (
        window.innerWidth < configService.FEED_LIST_BREAKPOINT &&
        !isSmallScreen
      ) {
        setIsSmallScreen(true)
      } else if (
        window.innerWidth >= configService.FEED_LIST_BREAKPOINT &&
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
