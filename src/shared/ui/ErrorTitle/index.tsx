import React, { FC } from 'react'

interface ErrorTitleProps {
  isError: boolean
  className?: string
}

export const ErrorTitle: FC<ErrorTitleProps> = ({
  isError,
  className = '',
  children,
}) => {
  const titleClassName = isError
    ? 'text-center m-auto text-4xl'
    : `text-black font-yuji dark:text-gray-100 text-2xl md:text-5xl ${className}`

  return (
    <h1 className={titleClassName}>
      {isError ? 'Something went wrong' : children}
    </h1>
  )
}
