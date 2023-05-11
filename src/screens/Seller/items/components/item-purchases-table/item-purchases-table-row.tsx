import React from 'react'
import { Table } from 'semantic-ui-react'
import type { ItemPurchaseForSeller } from '@/types'

interface Props {
  purchase: ItemPurchaseForSeller
}

const Component = ({ purchase }: Props) => (
  <Table.Row key={purchase.purchaseId}>
    <Table.Cell>{purchase.purchaseId}</Table.Cell>
    <Table.Cell>{purchase.buyer}</Table.Cell>
    <Table.Cell>{purchase.date.toLocaleString()}</Table.Cell>
  </Table.Row>
)

export default Component
