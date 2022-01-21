import React, { FC } from 'react'
import TheHeader from 'components/layout/TheHeader/TheHeader'
import TheFooter from 'components/layout/TheFooter/TheFooter'
import ScrollToTop from 'shared/ui/ScrollToTop'

export const Main: FC = ({ children }) => {
  return (
    <div className={'h-screen flex flex-col text-black dark:text-gray-100'}>
      <TheHeader />
      <main
        className={
          'bg-pink-50 flex-grow mt-16 dark:bg-gray-600 transition-colors duration-200'
        }
      >
        <div className={'min-h-full flex flex-col main-container mx-auto pt-6'}>
          {children}
        </div>
      </main>
      <ScrollToTop />
      <TheFooter />
    </div>
  )
}
