import { useState, useEffect, useContext } from 'react'
import { Web3Context } from '@/context/web3-context'
import { handleError } from '@/lib/errorHandler'
import type { NewItemProps } from '@/types'
import { pollBlockchainResponse } from '@/utils/pollBlockchainResponse'
import { useContract } from './useContract'

interface Result {
  isLoading: boolean
  error: string
}

interface Props {
  enabled: boolean
  data: NewItemProps
  onSuccess: () => void
  onError: () => void
}

export const useAddItemAsSeller = ({
  enabled,
  onSuccess,
  onError,
  data,
}: Props): Result => {
  const { toTokens } = useContext(Web3Context)
  const {
    data: contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (contractError) {
      setError(contractError)
    }
  }, [contractError])

  useEffect(() => {
    if (!contract) return
    if (!enabled) return
    if (isLoading) return

    const perform = async () => {
      setError('')
      setIsLoading(true)

      try {
        const priceConverted = toTokens(data.price)

        const tx = await contract
          .sell(priceConverted, data.title, data.redirectTo)
          .send({
            feeLimit: 1_000_000_000,
            callValue: 0,
          })

        await pollBlockchainResponse({
          tx: tx,
          onError: (e: string) => {
            setError(e)
            onError()
          },
          onSuccess: onSuccess,
        })
      } catch (e) {
        setError(handleError(e))
        onError()
      } finally {
        setIsLoading(false)
      }
    }

    perform()
  }, [isLoading, contract, enabled, data, onSuccess, onError, toTokens])

  return { isLoading: contractLoading || isLoading, error }
}
