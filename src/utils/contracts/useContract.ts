import { useState, useEffect, useContext } from 'react'
import { Web3Context } from '@/context/web3-context'
import { handleError } from '@/lib/errorHandler'

interface MarketplaceGetItemResponse {
  price: number
  seller: string
  title: string
  purchasesCount: number
  redirectTo: string
}

interface MarketplaceGetItemPurchasesResponse {
  purchaseId: number[]
  buyer: string[]
  date: number[]
}

interface MarketplaceGetItemsForSellerResponse {
  itemId: number[]
  itemPrice: number[]
  itemCreatedAt: number[]
  itemPurchases: number[]
  itemTitle: string[]
}

interface MarketplaceGetPurchasesForBuyerResponse {
  purchaseId: number[]
  itemId: number[]
  title: string[]
  price: number[]
  date: number[]
}

interface MarketplaceContract {
  sell(
    _price: number,
    _title: string,
    _redirectTo: string
  ): {
    send: (_args: unknown) => Promise<string>
  }
  buy(_itemId: string): {
    send: (_args: unknown) => Promise<string>
  }
  getItem(_itemId: string): {
    call: () => Promise<MarketplaceGetItemResponse>
  }
  getItemPurchases(_itemId: string): {
    call: () => Promise<MarketplaceGetItemPurchasesResponse>
  }
  getMyItems(): {
    call: () => Promise<MarketplaceGetItemsForSellerResponse>
  }
  getMyPurchases(): {
    call: () => Promise<MarketplaceGetPurchasesForBuyerResponse>
  }
  serviceFee(): {
    call: () => Promise<number>
  }
}

interface Result {
  isLoading: boolean
  data: MarketplaceContract | null
  error: string
}

export const useContract = (): Result => {
  const { wallet, contractAddress } = useContext(Web3Context)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<MarketplaceContract | null>(null)

  useEffect(() => {
    if (!wallet) return
    if (!contractAddress) return
    if (data) return

    const perform = async () => {
      setError('')
      setIsLoading(true)

      try {
        const response = await wallet.contract().at(contractAddress)

        setData(response as MarketplaceContract)
      } catch (e) {
        setError(handleError(e))
      } finally {
        setIsLoading(false)
      }
    }

    perform()
  }, [data, wallet, contractAddress])

  return { isLoading, data, error }
}
