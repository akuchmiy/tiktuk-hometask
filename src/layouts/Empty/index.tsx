import React, { FC } from 'react'

export const Empty: FC = ({ children }) => {
  return (
    <div className={'h-screen flex flex-col text-black dark:text-gray-100'}>
      <main
        className={
          'bg-pink-50 flex-grow dark:bg-gray-600 transition-colors duration-200'
        }
      >
        {children}
      </main>
    </div>
  )
}
