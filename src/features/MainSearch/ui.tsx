import React, { FC, FormEvent, useMemo } from 'react'
import Input from 'shared/ui/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useInput from 'shared/hooks/useInput'
import { useNavigate } from 'react-router-dom'

interface MainSearchProps {
  className?: string
}

export const MainSearch: FC<MainSearchProps> = ({ className }) => {
  const query = useInput('')
  const navigate = useNavigate()
  const [newLocation, ariaNavigateTo] = useMemo(() => {
    if (!query.value) return ['', 'Enter hashtag or username']

    if (!query.value.startsWith('#'))
      return [`/user/${query.value}`, 'Find user by username']

    const encodedWithoutHash = encodeURIComponent(query.value.substring(1))
    return [`/?query=${encodedWithoutHash}`, `Get trending news by hashtag`]
  }, [query])

  function findByQuery(e: FormEvent) {
    e.preventDefault()

    if (newLocation) navigate(newLocation)
    query.setValue('')
  }

  return (
    <form
      onSubmit={findByQuery}
      className={`center relative overflow-hidden w-1/2 ${className}`}
    >
      <Input
        aria-label={ariaNavigateTo}
        {...query.use()}
        placeholder={'Hashtag or nickname'}
        className={'w-full'}
        type="text"
      />
      {query.value && (
        <button
          type={'submit'}
          aria-label={ariaNavigateTo}
          className={
            'absolute right-2 border-2 border-pink-200 bg-pink-100 p-1 rounded-xl w-8 h-8 ' +
            'dark:border-gray-100 dark:bg-gray-600'
          }
        >
          <FontAwesomeIcon className={'text-xl'} icon={['fas', 'search']} />
        </button>
      )}
    </form>
  )
}
