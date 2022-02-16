import React, { FC, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ScrollToTop: FC = () => {
  const [visible, setVisible] = useState(false)

  function toTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const onScroll = () => {
      const isLowerThanOneViewport = window.scrollY > window.innerHeight

      if (isLowerThanOneViewport && !visible) setVisible(true)
      else if (!isLowerThanOneViewport && visible) setVisible(false)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [setVisible, visible])

  if (visible)
    return (
      <button
        aria-label={'Scroll to top'}
        className={
          'w-12 h-12 center fixed bottom-5 border-2 border-pink-300 right-5 text-2xl text-black bg-pink-200 rounded-full ' +
          'dark:bg-gray-600 dark:border-gray-300 dark:text-gray-100 z-50'
        }
        onClick={toTop}
      >
        <FontAwesomeIcon
          className={'animate-bounce'}
          icon={['fas', 'angle-double-up']}
        />
      </button>
    )

  return null
}
