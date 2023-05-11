import React from 'react'
import { Table } from 'semantic-ui-react'
import type { PurchaseForBuyer } from '@/types'
import Purchase from './purchases-table-row'

interface Props {
  purchases: PurchaseForBuyer[]
}

const Component = ({ purchases }: Props) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Purchase ID</Table.HeaderCell>
        <Table.HeaderCell>Item ID</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Purchase Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {purchases.map((purchase) => (
        <Purchase key={purchase.purchaseId} purchase={purchase} />
      ))}
    </Table.Body>
  </Table>
)

export default Component
