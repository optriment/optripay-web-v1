import React, { useState } from 'react'
import {
  Accordion,
  Icon,
  Segment,
  Button,
  Container,
  Grid,
  Header,
} from 'semantic-ui-react'
import { useIsMobile } from '@/utils/use-is-mobile'
import type { AccordionTitleProps } from 'semantic-ui-react'

const Screen = () => {
  const isMobile = useIsMobile()

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

  return (
    <Grid container={!isMobile} columns={1}>
      <Grid.Column textAlign="center">
        <Segment
          secondary
          size={isMobile ? undefined : 'big'}
          style={isMobile ? null : { padding: '2em' }}
        >
          <Header
            as="h1"
            content="OptriPay"
            style={isMobile ? null : { fontSize: '2.5em' }}
          />

          <Header as="h2" style={isMobile ? null : { fontSize: '1.3em' }}>
            Cut out the middleman and sell your products using USDT on our
            platform.
          </Header>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Container text textAlign="justified">
          <p>
            Welcome to our decentralized marketplace where sellers can easily
            sell their items using USDT tokens. Our platform provides a safe,
            secure, and efficient way for sellers to list and sell their
            products without any intermediaries, all while using the stable USDT
            token. With our platform, you can easily create your own store and
            start selling your products in a matter of minutes.
          </p>

          <p>
            Using USDT as the main currency on our platform has many benefits
            for both buyers and sellers. USDT is a stable coin that is pegged to
            the value of the US dollar, which means that it has low volatility
            and is not subject to the same price fluctuations as other
            cryptocurrencies. This makes it an ideal currency for buying and
            selling goods and services, as the price of USDT remains relatively
            stable.
          </p>

          <p>
            Our platform also uses smart contract technology to ensure that all
            transactions are secure and transparent. Smart contracts are
            self-executing contracts that automatically enforce the rules and
            regulations of a transaction, which means that there is no need for
            intermediaries like banks or other financial institutions. This
            makes our platform fast, efficient, and cost-effective for both
            buyers and sellers.
          </p>

          <p>
            <b>
              Join our decentralized marketplace today and start selling your
              products using USDT!
            </b>
          </p>
        </Container>
      </Grid.Column>

      <Grid.Column>
        <Container textAlign="center">
          <Button
            primary
            as="a"
            href="/seller"
            size={isMobile ? 'huge' : 'massive'}
            content="Sell your first item!"
          />
        </Container>
      </Grid.Column>

      <Grid.Column>
        <Header as="h2" textAlign="center" content="F.A.Q." />

        <Container text textAlign="justified">
          <Accordion styled fluid>
            <Accordion.Title
              active={accordionIndex === 0}
              index={0}
              onClick={handleAccordion}
            >
              <Icon name="dropdown" />
              Which wallet do you support?
            </Accordion.Title>
            <Accordion.Content active={accordionIndex === 0}>
              <p>
                Our decentralized marketplace is proud to work with TronLink
                wallet, one of the most popular wallets for TRON (TRX) and
                TRC-20 tokens. To use our platform, you must have TronLink
                wallet installed on your device.
              </p>

              <p>
                TronLink is a secure and user-friendly wallet that allows you to
                manage your digital assets and interact with decentralized
                applications (DApps) on the TRON network. With TronLink, you can
                easily send and receive USDT and other TRC-20 tokens, as well as
                access a range of DApps, including our decentralized
                marketplace.
              </p>

              <p>
                By working with TronLink, we can ensure that all transactions on
                our platform are secure, transparent, and efficient. TronLink
                uses industry-standard encryption to protect your private keys,
                which means that your assets are always safe and under your
                control.
              </p>

              <p>
                Installing TronLink is quick and easy. Simply download the
                wallet from the TronLink website or your device&apos;s app
                store, create a new wallet or import an existing one, and start
                using our decentralized marketplace to buy and sell products
                using USDT. With TronLink and our platform, you can enjoy a
                seamless and hassle-free selling experience.
              </p>
            </Accordion.Content>

            <Accordion.Title
              active={accordionIndex === 1}
              index={1}
              onClick={handleAccordion}
            >
              <Icon name="dropdown" />
              Platform commission
            </Accordion.Title>
            <Accordion.Content active={accordionIndex === 1}>
              <p>
                We pride ourselves on being a low-cost and transparent platform
                for sellers to list and sell their products. Our commission fee
                is just 1%, which is charged to the seller upon the completion
                of each transaction. This means that sellers can keep more of
                their profits and buyers can enjoy lower prices on our platform.
              </p>

              <p>
                Our commission fee covers the cost of maintaining and improving
                our platform, including server costs, development expenses, and
                customer support. By keeping our fees low, we aim to provide a
                fair and accessible platform for sellers of all sizes.
              </p>

              <p>
                Our commission fee is automatically deducted from the
                seller&apos;s account at the time of the transaction, so there
                are no surprises or hidden fees. We believe in being transparent
                and upfront about our fees, so that sellers can make informed
                decisions about their pricing and profits.
              </p>

              <p>
                With our low commission fee and user-friendly platform, selling
                your products using USDT has never been easier or more
                affordable.
              </p>
            </Accordion.Content>

            <Accordion.Title
              active={accordionIndex === 2}
              index={2}
              onClick={handleAccordion}
            >
              <Icon name="dropdown" />
              Blockchain network gas fees
            </Accordion.Title>
            <Accordion.Content active={accordionIndex === 2}>
              <p>
                When using a blockchain-based platform, like our decentralized
                marketplace, buyers and sellers must pay gas fees to process
                transactions. Gas fees are a form of payment made to the network
                of nodes that maintain and validate the blockchain. These fees
                help to incentivize the network&apos;s participants to keep the
                blockchain secure and decentralized.
              </p>

              <p>
                In our platform, buyers and sellers pay gas fees in addition to
                the commission fee charged by our platform. Gas fees are
                calculated based on the amount of computing resources required
                to execute the transaction and the current network congestion
                levels. The fees are paid in cryptocurrency, such as TRON (TRX),
                and can vary in price depending on market conditions.
              </p>

              <p>
                While gas fees are an additional cost that buyers and sellers
                must consider when using our platform, they are an essential
                part of ensuring the security and efficiency of blockchain-based
                transactions. By paying gas fees, buyers and sellers can be
                confident that their transactions will be processed quickly and
                accurately, without the need for intermediaries or centralized
                authorities.
              </p>

              <p>
                We recommend that buyers and sellers keep an eye on gas fees and
                adjust their pricing and transaction sizes accordingly to
                optimize their costs on our platform.
              </p>
            </Accordion.Content>
          </Accordion>
        </Container>
      </Grid.Column>
    </Grid>
  )
}

export default Screen
