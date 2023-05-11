import React from 'react'
import { Table } from 'semantic-ui-react'
import type { ItemPurchaseForSeller } from '@/types'
import ItemPurchase from './item-purchases-table-row'

interface Props {
  purchases: ItemPurchaseForSeller[]
}

const Component = ({ purchases }: Props) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Purchase ID</Table.HeaderCell>
        <Table.HeaderCell>Buyer</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {purchases.map((purchase) => (
        <ItemPurchase key={purchase.purchaseId} purchase={purchase} />
      ))}
    </Table.Body>
  </Table>
)

export default Component
