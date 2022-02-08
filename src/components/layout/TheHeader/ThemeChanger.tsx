import React, { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ThemeChanger: FC = () => {
  const hasDarkClass = document.documentElement.classList.contains('dark')
  const [isDark, setIsDark] = useState(hasDarkClass)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

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

  const classNames =
    'w-10 h-10 rounded-full absolute text-xl border-2 right-3 top-3'
  return (
    <button
      tabIndex={-1}
      aria-hidden={true}
      className={`text-black dark:text-white border-black dark:border-white ${classNames}`}
      onClick={() => setIsDark(!isDark)}
    >
      <FontAwesomeIcon icon={['fas', isDark ? 'sun' : 'moon']} />
    </button>
  )
}

export default ThemeChanger
