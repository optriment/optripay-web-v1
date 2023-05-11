import React, { useState, useContext } from 'react'
import { Grid, Button, Container, Header } from 'semantic-ui-react'
import { ErrorMessage, TransactionLoadingMessage } from '@/components'
import { Web3Context } from '@/context/web3-context'
import { usePurchaseItem } from '@/utils/contracts'
import { useSetTokenAllowance } from '@/utils/tokens'
import { useIsMobile } from '@/utils/use-is-mobile'

interface Props {
  itemId: string
  onDeclined: () => void
  onPurchased: (_tx: string) => void
}

const Screen = ({ itemId, onDeclined, onPurchased }: Props) => {
  const isMobile = useIsMobile()
  const { tokenSymbol } = useContext(Web3Context)

  const [revokeEnabled, setRevokeEnabled] = useState<boolean>(false)
  const [purchaseEnabled, setPurchaseEnabled] = useState<boolean>(false)

  const { isLoading: isDeclining, error: declineError } = useSetTokenAllowance({
    enabled: revokeEnabled,
    data: {
      newAllowance: 0,
    },
    onSuccess: () => {
      setRevokeEnabled(false)
      onDeclined()
    },
    onError: () => {
      setRevokeEnabled(false)
    },
  })

  const { isLoading: isPurchasing, error: purchaseError } = usePurchaseItem({
    enabled: purchaseEnabled,
    data: {
      itemId,
    },
    onSuccess: (tx: string) => {
      setPurchaseEnabled(false)
      onPurchased(tx)
    },
    onError: () => {
      setPurchaseEnabled(false)
    },
  })

  return (
    <>
      {declineError && (
        <Grid.Column>
          <ErrorMessage
            header="Unable to decline purchase"
            content={declineError}
          />
        </Grid.Column>
      )}

      {purchaseError && (
        <Grid.Column>
          <ErrorMessage header="Unable to purchase" content={purchaseError} />
        </Grid.Column>
      )}

      {(isDeclining || isPurchasing) && (
        <Grid.Column>
          <TransactionLoadingMessage />
        </Grid.Column>
      )}

      <Grid.Column>
        <Header
          as="h2"
          content="We are ready to process your payment"
          textAlign="center"
        />

        <Container text textAlign="justified">
          <p>
            Once you have been prompted to approve the transfer of
            {' ' + tokenSymbol} tokens in the first step of the payment process,
            you will be given the option to either revoke approval or proceed
            with the purchase.
          </p>

          <p>
            If you choose to revoke, the allowance will be rejected and the
            seller will not be paid - they will not be able to access or steal
            your funds. However, if you choose to proceed with the purchase, the
            tokens will be transferred to the seller immediately, and the
            transaction will be considered complete.
          </p>
        </Container>
      </Grid.Column>

      <Grid.Column>
        <Container textAlign="center">
          <Button
            negative
            size={isMobile ? 'big' : 'massive'}
            onClick={() => setRevokeEnabled(true)}
            content="Revoke"
            disabled={isDeclining || isPurchasing}
          />

          <Button
            positive
            size={isMobile ? 'big' : 'massive'}
            onClick={() => setPurchaseEnabled(true)}
            content="Proceed"
            disabled={isPurchasing || isDeclining}
          />
        </Container>
      </Grid.Column>
    </>
  )
}

export default Screen
