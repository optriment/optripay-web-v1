import React, { useContext } from 'react'
import { Segment, Header } from 'semantic-ui-react'
import { Web3Context } from '@/context/web3-context'
import type { ItemForBuyer } from '@/types'
import { useIsMobile } from '@/utils/use-is-mobile'

interface Props {
  item: ItemForBuyer
}

const Screen = ({ item }: Props) => {
  const isMobile = useIsMobile()
  const { tokenSymbol, fromTokens } = useContext(Web3Context)

  return (
    <Segment
      secondary
      size={isMobile ? undefined : 'big'}
      style={isMobile ? null : { padding: '2em' }}
    >
      <Header as="h1">{item.title}</Header>

      <Header as="h2">
        {fromTokens(item.price)} {tokenSymbol}
      </Header>
    </Segment>
  )
}

export default Screen
