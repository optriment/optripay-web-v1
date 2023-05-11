import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import type { ItemForSeller } from '@/types'

interface Props {
  item: ItemForSeller
  onCopy: (_itemId: number) => void
}

const Component = ({ item, onCopy }: Props) => (
  <Table.Row key={item.id}>
    <Table.Cell>{item.id}</Table.Cell>
    <Table.Cell>{item.title}</Table.Cell>
    <Table.Cell>{item.price}</Table.Cell>
    <Table.Cell>{item.purchases}</Table.Cell>
    <Table.Cell>{item.createdAt.toLocaleString()}</Table.Cell>
    <Table.Cell textAlign="right">
      <Button
        as="a"
        icon="eye"
        href={`/buy/${item.id}`}
        target="_blank"
        title="Preview"
      />
      <Button icon="copy" title="Copy link" onClick={() => onCopy(item.id)} />
      <Button
        as="a"
        icon="chart line"
        href={`/seller/items/${item.id}/purchases`}
        title="View Purchases"
      />
      <Button
        as="a"
        icon="pencil"
        href={`/seller/items/${item.id}/edit`}
        title="Edit"
        disabled
      />
    </Table.Cell>
  </Table.Row>
)

export default Component
