import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import { ErrorMessage, LoadingMessage } from '@/components'
import { Web3Context } from '@/context/web3-context'
import { useGetItemForBuyer } from '@/utils/contracts'
import { useGetTokenAllowance } from '@/utils/tokens'
import { useIsMobile } from '@/utils/use-is-mobile'
import AllowanceReachedScreen from './allowance-reached'
import AllowanceRevertedScreen from './allowance-reverted'
import ApproveRequiredScreen from './approve-required'
import ItemHeader from './item-header'
import ItemPurchasedScreen from './item-purchased'

type Props = {
  itemId: string
}

const Screen = ({ itemId }: Props) => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const { address } = useContext(Web3Context)

  const {
    data: item,
    isLoading: itemLoading,
    error: itemError,
  } = useGetItemForBuyer({ itemId })

  const {
    data: allowance,
    isLoading: allowanceLoading,
    error: allowanceError,
  } = useGetTokenAllowance()

  const [requiredAllowance, setRequiredAllowance] = useState<number>(0)

  const [nextScreen, setNextScreen] = useState<string>('landing')
  const [purchasedItemTx, setPurchasedItemTx] = useState<string>('')

  useEffect(() => {
    if (!item) return
    if (allowance === null) return

    setNextScreen(allowance >= item.price ? 'purchase' : 'request_allowance')
    setRequiredAllowance(item.price - allowance)
  }, [item, allowance])

  const onPurchased = (tx: string) => {
    if (item && item.redirectTo.trim().length > 0) {
      router.push({
        pathname: item.redirectTo.trim(),
        query: {
          tx: tx,
          from: address,
          purchasedItemId: itemId,
        },
      })
    } else {
      setPurchasedItemTx(tx)
      setNextScreen('purchased')
    }
  }

  if (itemError) {
    return <ErrorMessage header="Unable to load item" content={itemError} />
  }

  if (allowanceError) {
    return (
      <ErrorMessage
        header="Unable to load allowance"
        content={allowanceError}
      />
    )
  }

  if (itemLoading || allowanceLoading) {
    return <LoadingMessage content="Loading..." />
  }

  if (!item) {
    return <LoadingMessage content="Initializing item..." />
  }

  if (allowance === null) {
    return <LoadingMessage content="Initializing allowance..." />
  }

  return (
    <Grid container={!isMobile} columns={1}>
      <Grid.Column textAlign="center">
        <ItemHeader item={item} />
      </Grid.Column>

      {nextScreen === 'landing' && <LoadingMessage content="Initializing..." />}

      {nextScreen === 'purchased' && (
        <ItemPurchasedScreen item={item} purchasedItemTx={purchasedItemTx} />
      )}

      {nextScreen === 'declined' && <AllowanceRevertedScreen />}

      {nextScreen === 'request_allowance' && (
        <ApproveRequiredScreen
          item={item}
          allowance={allowance}
          requiredAllowance={requiredAllowance}
          onAllowanceReached={() => setNextScreen('purchase')}
        />
      )}

      {nextScreen === 'purchase' && (
        <AllowanceReachedScreen
          itemId={itemId}
          onDeclined={() => setNextScreen('declined')}
          onPurchased={onPurchased}
        />
      )}
    </Grid>
  )
}

export default Screen
