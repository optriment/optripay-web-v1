import React from 'react'
import { Grid, Divider, Container, Header } from 'semantic-ui-react'

const Screen: React.FC = () => (
  <>
    <Grid.Column>
      <Header
        color="red"
        dividing
        as="h2"
        textAlign="center"
        content="You've declined the purchase and revoked the allowance"
      />

      <Divider hidden />

      <Container text textAlign="center">
        <p>
          You&apos;ve declined the purchase, your allowance for the transfer
          tokens was reverted, and the transaction will not be processed. If you
          accidentally made a mistake and still wish to purchase this item, you
          may simply refresh the page.
        </p>
      </Container>
    </Grid.Column>
  </>
)

export default Screen
