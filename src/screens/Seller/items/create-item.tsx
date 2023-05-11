import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Header } from 'semantic-ui-react'
import {
  ErrorMessage,
  LoadingMessage,
  TransactionLoadingMessage,
} from '@/components'
import type { NewItemProps } from '@/types'
import { useAddItemAsSeller, useGetServiceFee } from '@/utils/contracts'
import { ItemForm } from './components'

const Screen: React.FC = () => {
  const router = useRouter()

  const {
    data: serviceFee,
    isLoading: serviceFeeLoading,
    error: serviceFeeError,
  } = useGetServiceFee()

  const [enabled, setEnabled] = useState<boolean>(false)
  const [data, setData] = useState<NewItemProps>({
    title: '',
    price: 0,
    redirectTo: '',
  })
  const { isLoading: isCreating, error: createError } = useAddItemAsSeller({
    enabled,
    data,
    onSuccess: () => {
      setEnabled(false)
      router.push('/seller/items')
    },
    onError: () => {
      setEnabled(false)
    },
  })

  const onFormSubmitted = async (newItem: NewItemProps) => {
    setData(newItem)
    setEnabled(true)
  }

  if (serviceFeeError) {
    return (
      <ErrorMessage
        header="Unable to load service fee"
        content={serviceFeeError}
      />
    )
  }

  if (serviceFeeLoading) {
    return <LoadingMessage content="Loading service fee..." />
  }

  return (
    <>
      <Header as="h1" content="Add Item" />

      {createError && (
        <ErrorMessage header="Unable to create item" content={createError} />
      )}

      {isCreating ? (
        <TransactionLoadingMessage />
      ) : (
        <ItemForm onFormSubmitted={onFormSubmitted} serviceFee={serviceFee} />
      )}
    </>
  )
}

export default Screen
