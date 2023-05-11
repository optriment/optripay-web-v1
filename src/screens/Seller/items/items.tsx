import getConfig from 'next/config'
import React from 'react'
import { Header } from 'semantic-ui-react'
import { ErrorMessage, LoadingMessage } from '@/components'
import { LinkButton } from '@/components/ui'
import { useCopyToClipboard } from '@/hooks'
import { useGetItemsForSeller } from '@/utils/contracts'
import { ItemsTable } from './components'

const { domain } = getConfig().publicRuntimeConfig

const Screen: React.FC = () => {
  const [, copy] = useCopyToClipboard()
  const { data: items, isLoading, error } = useGetItemsForSeller()

  const onCopy = async (itemId: number) => {
    const copied = await copy(`${domain}/buy/${itemId}`)

    if (copied) {
      alert('Item URL has been copied to clipboard')
    }
  }

  return (
    <>
      <Header as="h1" content="My Items" />

      <LinkButton href="/seller/items/new" content="Add New" />

      {isLoading ? (
        <LoadingMessage content="Loading items..." />
      ) : error ? (
        <ErrorMessage header="Unable to load items" content={error} />
      ) : (
        items && <ItemsTable items={items} onCopy={onCopy} />
      )}
    </>
  )
}

export default Screen
