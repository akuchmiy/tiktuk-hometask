import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface AmountChangerProps {
  amount: number
  setAmount: (amount: number) => void
  minAmount: number
  maxAmount: number
  className?: string
}

const AmountChanger: FC<AmountChangerProps> = ({
  setAmount,
  amount,
  minAmount,
  maxAmount,
  className = '',
}) => {
  function changeAmount(direction: 'UP' | 'DOWN') {
    if (direction === 'UP') {
      setAmount(amount + 1)
    } else {
      setAmount(amount - 1)
    }
  }

  return (
    <div className={className}>
      <button
        disabled={amount === maxAmount}
        className={'hover:text-gray-400'}
        onClick={() => changeAmount('UP')}
        tabIndex={-1}
      >
        <FontAwesomeIcon icon={['fas', 'plus']} />
      </button>
      <div className={'w-full h-px bg-gray-700 my-2 dark:bg-gray-100'} />
      <button
        disabled={amount === minAmount}
        className={'hover:text-gray-400'}
        onClick={() => changeAmount('DOWN')}
        tabIndex={-1}
      >
        <FontAwesomeIcon icon={['fas', 'minus']} />
      </button>
    </div>
  )
}

export default AmountChanger
