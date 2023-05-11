import React from 'react'
import { Header } from 'semantic-ui-react'
import { ErrorMessage, LoadingMessage } from '@/components'
import { useGetItemPurchasesForSeller } from '@/utils/contracts'
import { ItemPurchasesTable } from './components'

interface Props {
  itemId: string
}

const Screen = ({ itemId }: Props) => {
  const {
    data: purchases,
    isLoading,
    error,
  } = useGetItemPurchasesForSeller({ itemId })

  return (
    <>
      <Header as="h1" content="Item Purchases" />

      {isLoading ? (
        <LoadingMessage content="Loading purchases..." />
      ) : error ? (
        <ErrorMessage header="Unable to load purchases" content={error} />
      ) : (
        purchases && <ItemPurchasesTable purchases={purchases} />
      )}
    </>
  )
}

export default Screen
