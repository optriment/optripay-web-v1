import React from 'react'
import { Header } from 'semantic-ui-react'
import { ErrorMessage, LoadingMessage } from '@/components'
import { useGetPurchasesForBuyer } from '@/utils/contracts'
import { PurchasesTable } from './components'

const Screen: React.FC = () => {
  const { data: purchases, isLoading, error } = useGetPurchasesForBuyer()

  return (
    <>
      <Header as="h1" content="My Purchases" />

      {isLoading ? (
        <LoadingMessage content="Loading purchases..." />
      ) : error ? (
        <ErrorMessage header="Unable to load purchases" content={error} />
      ) : (
        purchases && <PurchasesTable purchases={purchases} />
      )}
    </>
  )
}

export default Screen
