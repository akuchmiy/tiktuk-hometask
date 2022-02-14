import React, { FC } from 'react'
import Header from 'layouts/partials/Header'
import Footer from 'layouts/partials/Footer'
import { ScrollToTop } from 'features/ScrollToTop'

export const Main: FC = ({ children }) => {
  return (
    <div className={'h-screen flex flex-col text-black dark:text-gray-100'}>
      <Header />
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
      <Footer />
    </div>
  )
}
