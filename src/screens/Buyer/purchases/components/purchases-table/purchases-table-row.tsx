import React from 'react'
import { Table } from 'semantic-ui-react'
import type { PurchaseForBuyer } from '@/types'

interface Props {
  purchase: PurchaseForBuyer
}

const Component = ({ purchase }: Props) => (
  <Table.Row key={purchase.purchaseId}>
    <Table.Cell>{purchase.purchaseId}</Table.Cell>
    <Table.Cell>{purchase.itemId}</Table.Cell>
    <Table.Cell>{purchase.itemTitle}</Table.Cell>
    <Table.Cell>{purchase.itemPrice}</Table.Cell>
    <Table.Cell>{purchase.itemPurchaseDate.toLocaleString()}</Table.Cell>
  </Table.Row>
)

export default Component
