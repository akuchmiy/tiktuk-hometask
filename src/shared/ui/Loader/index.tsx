import React, { FC } from 'react'
import styles from './Loader.module.css'

interface LoaderProps {
  isLoading?: boolean
  className?: string
}

const Loader: FC<LoaderProps> = ({
  isLoading = true,
  className = '',
  children,
}) => {
  if (isLoading)
    return (
      <div className={`w-48 h-48 mx-auto bg-transparent relative ${className}`}>
        <div
          className={`${styles.dot1} top-16 left-16 transform absolute w-16 h-16 z-30 rounded-full bg-white shadow`}
        />
        <div
          className={`${styles.dot2} top-8 left-8 transform absolute w-32 h-32 z-20 rounded-full bg-white shadow`}
        />
        <div
          className={`${styles.dot3} top-0 left-0 transform absolute w-48 h-48 z-10 rounded-full bg-white shadow`}
        />
      </div>
    )

  return <>{children}</>
}

export default Loader
