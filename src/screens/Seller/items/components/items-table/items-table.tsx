import React from 'react'
import { Table } from 'semantic-ui-react'
import type { ItemForSeller } from '@/types'
import Item from './items-table-row'

interface Props {
  items: ItemForSeller[]
  onCopy: (_itemId: number) => void
}

const Component = ({ items, onCopy }: Props) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
        <Table.HeaderCell>Purchases</Table.HeaderCell>
        <Table.HeaderCell>Created</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {items.map((item) => (
        <Item key={item.id} item={item} onCopy={onCopy} />
      ))}
    </Table.Body>
  </Table>
)

export default Component
