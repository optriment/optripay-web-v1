import { useState, useEffect } from 'react'
import { handleError } from '@/lib/errorHandler'
import type { ItemForBuyer } from '@/types'
import { useContract } from './useContract'

interface Result {
  isLoading: boolean
  data: ItemForBuyer | null
  error: string
}

interface Props {
  itemId: string
}

export const useGetItemForBuyer = ({ itemId }: Props): Result => {
  const {
    data: contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<ItemForBuyer | null>(null)

  useEffect(() => {
    if (contractError) {
      setError(contractError)
    }
  }, [contractError])

  useEffect(() => {
    if (!contract) return
    if (itemId === null) return

    const perform = async () => {
      setError('')
      setIsLoading(true)

      try {
        const response = await contract.getItem(itemId).call()

        setData({
          price: +response.price,
          seller: response.seller,
          title: response.title,
          purchases: +response.purchasesCount,
          redirectTo: response.redirectTo,
        })
      } catch (e) {
        setError(handleError(e))
      } finally {
        setIsLoading(false)
      }
    }

    perform()
  }, [contract, itemId])

  return { isLoading: contractLoading || isLoading, data, error }
}
