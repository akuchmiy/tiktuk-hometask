import React, { FC, useEffect, useState } from 'react'
import { FeedList } from 'entities/Feed'
import useSmallScreen from 'shared/hooks/useSmallScreen'
import AmountChanger from 'shared/ui/AmountChanger'
import { Feed } from 'shared/api'

interface ControllableFeedListProps {
  feedList: Feed[]
  currentColumns?: number
  minColumns?: number
  maxColumns?: number
  showDescription: boolean
}

export const ControllableFeedList: FC<ControllableFeedListProps> = ({
  feedList,
  currentColumns = 1,
  minColumns = 1,
  maxColumns = 3,
  showDescription = false,
}) => {
  const [columns, setColumns] = useState<number>(currentColumns)
  const isSmallScreen = useSmallScreen()

  useEffect(() => {
    if (isSmallScreen) setColumns(1)
  }, [isSmallScreen])

  return (
    <>
      <FeedList
        feedList={feedList}
        columns={columns}
        showDescription={showDescription || columns !== maxColumns}
        className={'gap-4 gap-y-20'}
      />
      {!isSmallScreen && (
        <AmountChanger
          minAmount={minColumns}
          maxAmount={maxColumns}
          setAmount={setColumns}
          amount={columns}
          className={
            'fixed top-1/3 right-2 p-1 flex flex-col text-xl bg-pink-200 border-2 border-pink-300 rounded-2xl text-gray-700 ' +
            'dark:text-gray-100 dark:bg-gray-700 dark:border-gray-300'
          }
        />
      )}
    </>
  )
}
