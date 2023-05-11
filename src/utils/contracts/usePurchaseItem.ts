import { useState, useEffect } from 'react'
import { handleError } from '@/lib/errorHandler'
import { pollBlockchainResponse } from '@/utils/pollBlockchainResponse'
import { useContract } from './useContract'

interface Result {
  isLoading: boolean
  error: string
}

interface Props {
  enabled: boolean
  data: {
    itemId: string
  }
  onSuccess: (_tx: string) => void
  onError: () => void
}

export const usePurchaseItem = ({
  enabled,
  onSuccess,
  onError,
  data,
}: Props): Result => {
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
        const tx = await contract.buy(data.itemId).send({
          feeLimit: 1_000_000_000,
          callValue: 0,
        })

        await pollBlockchainResponse({
          tx: tx,
          onError: (e: string) => {
            setError(e)
            onError()
          },
          onSuccess: () => {
            onSuccess(tx)
          },
        })
      } catch (e) {
        setError(handleError(e))
        onError()
      } finally {
        setIsLoading(false)
      }
    }

    perform()
  }, [isLoading, contract, enabled, data, onSuccess, onError])

  return { isLoading: contractLoading || isLoading, error }
}
