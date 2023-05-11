import { useState, useEffect, useContext } from 'react'
import { Web3Context } from '@/context/web3-context'
import { handleError } from '@/lib/errorHandler'
import { pollBlockchainResponse } from '@/utils/pollBlockchainResponse'
import { useToken } from './useToken'

interface Result {
  isLoading: boolean
  error: string
}

interface Props {
  enabled: boolean
  data: {
    addedValue: number
  }
  onSuccess: () => void
  onError: () => void
}

export const useIncreaseTokenAllowance = ({
  enabled,
  onSuccess,
  onError,
  data,
}: Props): Result => {
  const { contractAddress } = useContext(Web3Context)
  const { data: token, isLoading: tokenLoading, error: tokenError } = useToken()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (tokenError) {
      setError(tokenError)
    }
  }, [tokenError])

  useEffect(() => {
    if (!token) return
    if (!enabled) return
    if (isLoading) return

    const perform = async () => {
      setError('')
      setIsLoading(true)

      try {
        const tx = await token
          .increaseAllowance(contractAddress, data.addedValue)
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
  }, [isLoading, token, contractAddress, enabled, data, onSuccess, onError])

  return { isLoading: tokenLoading || isLoading, error }
}
