import { useState, useEffect, useContext } from 'react'
import { Web3Context } from '@/context/web3-context'
import { handleError } from '@/lib/errorHandler'
import type { PurchaseForBuyer } from '@/types'
import { useContract } from './useContract'

interface Result {
  isLoading: boolean
  data: PurchaseForBuyer[]
  error: string
}

export const useGetPurchasesForBuyer = (): Result => {
  const { fromTokens } = useContext(Web3Context)
  const {
    data: contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<PurchaseForBuyer[]>([])

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
        const response = await contract.getMyPurchases().call()

        const purchases: PurchaseForBuyer[] = []

        for (let idx = 0; idx < response.purchaseId.length; idx++) {
          purchases.push({
            purchaseId: +response.purchaseId[idx],
            itemId: +response.itemId[idx],
            itemTitle: response.title[idx],
            itemPrice: fromTokens(+response.price[idx]),
            itemPurchaseDate: new Date(+response.date[idx] * 1000),
          })
        }

        setData(purchases)
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
