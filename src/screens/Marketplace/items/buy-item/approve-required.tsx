import React, { useState, useContext } from 'react'
import {
  Accordion,
  Icon,
  Grid,
  Message,
  Button,
  Divider,
  Container,
  Header,
} from 'semantic-ui-react'
import {
  ErrorMessage,
  LoadingMessage,
  TransactionLoadingMessage,
} from '@/components'
import { Web3Context } from '@/context/web3-context'
import type { ItemForBuyer } from '@/types'
import {
  useGetTokenBalance,
  useIncreaseTokenAllowance,
  useSetTokenAllowance,
} from '@/utils/tokens'
import { useIsMobile } from '@/utils/use-is-mobile'
import type { AccordionTitleProps } from 'semantic-ui-react'

interface Props {
  item: ItemForBuyer
  allowance: number
  requiredAllowance: number
  onAllowanceReached: () => void
}

const Screen = ({
  item,
  allowance,
  requiredAllowance,
  onAllowanceReached,
}: Props) => {
  const isMobile = useIsMobile()
  const { fromTokens, tokenSymbol } = useContext(Web3Context)
  const {
    data: myTokenBalance,
    isLoading: balanceLoading,
    error: balanceError,
  } = useGetTokenBalance()

  const [approveEnabled, setApproveEnabled] = useState<boolean>(false)
  const [increaseEnabled, setIncreaseEnabled] = useState<boolean>(false)

  const [accordionIndex, setAccordionIndex] = useState<
    string | number | undefined
  >(-1)

  const handleAccordion = (
    _: React.MouseEvent<HTMLDivElement>,
    titleProps: AccordionTitleProps
  ) => {
    const { index } = titleProps
    const newIndex = accordionIndex === index ? -1 : index

    setAccordionIndex(newIndex)
  }

  const { isLoading: isApproving, error: approveError } = useSetTokenAllowance({
    enabled: approveEnabled,
    data: {
      newAllowance: requiredAllowance,
    },
    onSuccess: () => {
      setApproveEnabled(false)
      onAllowanceReached()
    },
    onError: () => {
      setApproveEnabled(false)
    },
  })

  const { isLoading: isIncreasing, error: increaseError } =
    useIncreaseTokenAllowance({
      enabled: increaseEnabled,
      data: {
        addedValue: requiredAllowance,
      },
      onSuccess: () => {
        setIncreaseEnabled(false)
        onAllowanceReached()
      },
      onError: () => {
        setIncreaseEnabled(false)
      },
    })

  const handleApprove = () => {
    setApproveEnabled(true)
  }

  const handleIncrease = () => {
    setIncreaseEnabled(true)
  }

  if (balanceLoading) {
    return <LoadingMessage content="Loading balance..." />
  }

  if (balanceError) {
    return (
      <ErrorMessage
        header="Unable to load token balance"
        content={balanceError}
      />
    )
  }

  if (myTokenBalance === null) {
    return <LoadingMessage content="Initializing balance..." />
  }

  return (
    <>
      {approveError && (
        <Grid.Column>
          <ErrorMessage
            header="Unable to approve allowance"
            content={approveError}
          />
        </Grid.Column>
      )}

      {increaseError && (
        <Grid.Column>
          <ErrorMessage
            header="Unable to increase allowance"
            content={increaseError}
          />
        </Grid.Column>
      )}

      {(isApproving || isIncreasing) && (
        <Grid.Column>
          <TransactionLoadingMessage />
        </Grid.Column>
      )}

      <Grid.Column>
        <Header as="h2" content="Important Information" textAlign="center" />

        <Accordion styled fluid>
          <Accordion.Title
            active={accordionIndex === 0}
            index={0}
            onClick={handleAccordion}
          >
            <Icon name="dropdown" />
            How does this platform work?
          </Accordion.Title>
          <Accordion.Content active={accordionIndex === 0}>
            <p>
              Processing a payment on blockchain involves multiple steps to
              ensure that the payment is processed securely and accurately. By
              following the instructions provided and confirming the transfer of
              {' ' + tokenSymbol} tokens, you can ensure a smooth and successful
              transaction.
            </p>

            <p>
              In the first step, we require you to approve the transfer of
              {' ' + tokenSymbol} tokens on behalf of you. This is usually done
              to confirm that you authorize the payment and that the tokens will
              be transferred from your account to the seller&apos;s account.
            </p>

            <p>
              It&apos;s important to note that the transfer of funds from your
              account to the seller&apos;s account will not occur until you have
              approved the transfer of {' ' + tokenSymbol} tokens in the first
              step. This is typically done to ensure that you have authorized
              the payment and that the tokens are available to cover the cost of
              the transaction. If for any reason in the next step you decide not
              to proceed with the purchase, you may reject the allowance and the
              transfer of {' ' + tokenSymbol} tokens will not occur.
            </p>

            <p>
              Once the transfer has been approved, we can proceed with the
              second step, which involves transferring the
              {' ' + tokenSymbol} tokens from your account to the seller&apos;s
              account. This step is typically completed once the transaction
              details have been confirmed, and the payment has been authorized
              using the {' ' + tokenSymbol} tokens that were approved in the
              first step.
            </p>

            <p>
              If you have any questions or concerns about the payment process,
              don&apos;t hesitate to contact us for assistance.
            </p>
          </Accordion.Content>
        </Accordion>
      </Grid.Column>

      {myTokenBalance < item.price ? (
        <Grid.Column>
          <Container>
            <Message warning>
              <Message.Content>
                <Message.Header>
                  We&apos;re sorry, but it appears that you don&apos;t have the
                  required tokens to purchase the item.
                </Message.Header>

                <Divider hidden />

                <p>
                  You&apos;ve only {fromTokens(myTokenBalance)} {tokenSymbol},
                  but the item&apos;s price is {fromTokens(item.price)}. Please
                  deposit {fromTokens(item.price - myTokenBalance)}
                  {' ' + tokenSymbol} into your wallet to process the payment
                  for {item.title}.
                  <br />
                </p>
              </Message.Content>
            </Message>
          </Container>
        </Grid.Column>
      ) : (
        <>
          <Grid.Column>
            <Container>
              <Message warning>
                <Message.Content>
                  <Message.Header>
                    You have enough tokens, but you don&apos;t have the required
                    allowance to purchase the item.
                  </Message.Header>

                  {!isMobile && <Divider hidden />}

                  <p>
                    However, we do know the exact amount of tokens (
                    {fromTokens(requiredAllowance)} {tokenSymbol}) that we need
                    to process the payment for {item.title}. Please click button
                    below to update tokens allowance.
                  </p>
                </Message.Content>
              </Message>
            </Container>
          </Grid.Column>

          <Grid.Column>
            <Container textAlign="center">
              {allowance === 0 ? (
                <Button
                  positive
                  size={isMobile ? 'huge' : 'massive'}
                  onClick={() => handleApprove()}
                  content={`Approve ${fromTokens(
                    requiredAllowance
                  )} ${tokenSymbol}`}
                  disabled={isApproving}
                />
              ) : (
                <Button
                  positive
                  size={isMobile ? 'huge' : 'massive'}
                  onClick={() => handleIncrease()}
                  content={`Increase allowance by ${fromTokens(
                    requiredAllowance
                  )} ${tokenSymbol}`}
                  disabled={isIncreasing}
                />
              )}
            </Container>
          </Grid.Column>
        </>
      )}
    </>
  )
}

export default Screen
