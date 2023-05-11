import { useState, useEffect, useContext } from 'react'
import { Web3Context } from '@/context/web3-context'
import { handleError } from '@/lib/errorHandler'
import type { ItemForSeller } from '@/types'
import { useContract } from './useContract'

interface Result {
  isLoading: boolean
  data: ItemForSeller[]
  error: string
}

export const useGetItemsForSeller = (): Result => {
  const { fromTokens } = useContext(Web3Context)
  const {
    data: contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<ItemForSeller[]>([])

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
        const response = await contract.getMyItems().call()

        const items: ItemForSeller[] = []

        for (let idx = 0; idx < response.itemId.length; idx++) {
          items.push({
            id: +response.itemId[idx],
            price: fromTokens(+response.itemPrice[idx]),
            createdAt: new Date(+response.itemCreatedAt[idx] * 1000),
            purchases: +response.itemPurchases[idx],
            title: response.itemTitle[idx],
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
  }, [contract, fromTokens])

  return { isLoading: contractLoading || isLoading, data, error }
}
