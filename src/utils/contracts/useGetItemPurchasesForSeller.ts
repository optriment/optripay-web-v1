import { useState, useEffect } from 'react'
import { handleError } from '@/lib/errorHandler'
import type { ItemPurchaseForSeller } from '@/types'
import { useContract } from './useContract'

interface Result {
  isLoading: boolean
  data: ItemPurchaseForSeller[]
  error: string
}

interface Props {
  itemId: string
}

export const useGetItemPurchasesForSeller = ({ itemId }: Props): Result => {
  const {
    data: contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<ItemPurchaseForSeller[]>([])

  useEffect(() => {
    if (contractError) {
      setError(contractError)
    }
  }, [contractError])

  useEffect(() => {
    if (!contract) return
    if (!itemId) return

    const perform = async () => {
      setError('')
      setIsLoading(true)

      try {
        const response = await contract.getItemPurchases(itemId).call()

        const items: ItemPurchaseForSeller[] = []

        for (let idx = 0; idx < response.purchaseId.length; idx++) {
          items.push({
            purchaseId: +response.purchaseId[idx],
            buyer: response.buyer[idx],
            date: new Date(+response.date[idx] * 1000),
          })
        }

        setData(items)
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
