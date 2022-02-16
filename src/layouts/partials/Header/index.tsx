import React from 'react'
import { Link } from 'react-router-dom'
import { MainSearch } from 'features/MainSearch'
import { ThemeChanger } from 'features/ThemeChanger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'

function Header() {
  return (
    <header
      className={
        'fixed top-0 left-0 w-full h-16 bg-pink-50 p-4 rounded-br-3xl rounded-bl-3xl border-b-2 border-pink-200 ' +
        'dark:bg-gray-700 dark:text-gray-100 dark:border-gray-100 shadow-md z-50 transition-colors duration-100'
      }
    >
      <div className="h-full main-container on-small-header mx-auto flex justify-between items-center">
        <div
          className={
            'group center font-yuji text-2xl sm:text-3xl h-full hover:drop-shadow-sm'
          }
        >
          <Link className={'flex align-baseline'} to="/">
            <span>Tik Tuk</span>
            <span
              className={
                'hide-small center ml-1 sm:ml-2 p-2 sm:p-2.5 text-xl sm:text-2xl rounded-full group-hover:bg-black text-black' +
                ' group-hover:text-white transition-colors ' +
                ' dark:text-white dark:group-hover:bg-white dark:group-hover:text-black'
              }
            >
              <FontAwesomeIcon icon={['fas', 'music']} />
            </span>
          </Link>
        </div>
        <MainSearch className={'on-small-search mr-6 md:w-1/3 md:mr-0'} />
        <ThemeChanger className={'absolute right-3 top-3'} />
      </div>
    </header>
  )
}

export default Header
