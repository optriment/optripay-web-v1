import Link from 'next/link'
import React, { useContext } from 'react'
import { Grid, Divider, Container, Header } from 'semantic-ui-react'
import { Web3Context } from '@/context/web3-context'
import type { ItemForBuyer } from '@/types'

interface Props {
  item: ItemForBuyer
  purchasedItemTx: string
}

const Screen = ({ item, purchasedItemTx }: Props) => {
  const { buildTronScanTransactionURL } = useContext(Web3Context)

  return (
    <>
      <Grid.Column>
        <Header
          color="blue"
          dividing
          as="h2"
          textAlign="center"
          content="Congratulations!"
        />

        <Divider hidden />

        <Container text textAlign="justified">
          <p>
            Your purchase of {item.title} has been completed successfully. We
            recommend that you contact the seller as soon as possible to arrange
            for delivery of your item. Thank you for using our platform!
          </p>

          <p>
            <b>
              <Link
                href={buildTronScanTransactionURL(purchasedItemTx)}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                Open your transaction details
              </Link>
            </b>
          </p>
        </Container>
      </Grid.Column>
    </>
  )
}

export default Screen
