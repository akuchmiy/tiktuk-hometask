import { useEffect, useState } from 'react'

export function useDarkMode(isInitialDark: boolean) {
  const [isDark, setIsDark] = useState(isInitialDark)

  useEffect(() => {
    const scheme = '(prefers-color-scheme: dark)'
    if (window?.matchMedia(scheme).matches) {
      setIsDark(true)
    }

    const listener = (e: MediaQueryListEventMap['change']) => {
      setIsDark(e.matches)
    }

    window.matchMedia(scheme).addEventListener('change', listener)
    return () =>
      window.matchMedia(scheme).removeEventListener('change', listener)
  }, [])

  return { isDark, setIsDark }
}
