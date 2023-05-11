import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui'
import React from 'react'
import { Menu } from 'semantic-ui-react'

const Component = () => (
  <Menu stackable size="huge">
    <Menu.Item as="a" href="/buyer" content="Dashboard" />

    <Menu.Item as="a" href="/buyer/purchases" content="Purchases" />

    <Menu.Item as="a" href="/seller" content="Become a Seller" />

    <Menu.Menu position="right">
      <Menu.Item>
        <WalletActionButton />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
)

export default Component
