import { useCallback, useEffect, useState } from 'react'

const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = useCallback(async () => {
    setIsLoading(true)
    setData(null)
    setError(null)

    try {
      const result = await asyncFunction()
      setData(result)
    } catch (error: any) {
      setError(error)
    }

    setIsLoading(false)
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, isLoading, data, error }
}

export default useAsync
