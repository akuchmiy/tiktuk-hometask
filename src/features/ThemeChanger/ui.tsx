import React, { FC, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDarkMode } from './model'

interface ThemeChangerProps {
  className?: string
}

export const ThemeChanger: FC<ThemeChangerProps> = ({ className = '' }) => {
  const isInitialDark = document.documentElement.classList.contains('dark')
  const { isDark, setIsDark } = useDarkMode(isInitialDark)

  useEffect(() => {
    if (isDark) return document.documentElement.classList.add('dark')

    document.documentElement.classList.remove('dark')
  }, [isDark])

  return (
    <button
      tabIndex={-1}
      aria-hidden={true}
      className={`text-black dark:text-white border-2 border-black dark:border-white w-10 
      h-10 rounded-full text-xl ${className}`}
      onClick={() => setIsDark(!isDark)}
    >
      <FontAwesomeIcon icon={['fas', isDark ? 'sun' : 'moon']} />
    </button>
  )
}
