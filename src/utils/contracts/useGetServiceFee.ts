import { useState, useEffect } from 'react'
import { handleError } from '@/lib/errorHandler'
import { useContract } from './useContract'

interface Result {
  isLoading: boolean
  data: number
  error: string
}

export const useGetServiceFee = (): Result => {
  const {
    data: contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<number>(0)

  useEffect(() => {
    if (contractError) {
      setError(contractError)
    }
  }, [contractError])

  useEffect(() => {
    if (!contract) return

    const perform = async () => {
      setError('')
      setIsLoading(true)

      try {
        const response = await contract.serviceFee().call()

        setData(+response)
      } catch (e) {
        setError(handleError(e))
      } finally {
        setIsLoading(false)
      }
    }

    perform()
  }, [contract])

  return { isLoading: contractLoading || isLoading, data, error }
}
