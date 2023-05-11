import React from 'react'
import { ConnectWalletMessage, WalletLoader } from '@/components'
import { useHasMounted } from '@/hooks'
import { SellerLayout } from '@/layouts'
import { SellerItemsScreen } from '@/screens/Seller'

const Page: React.FC = () => {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return <p>Not mounted yet</p>
  }

  return (
    <SellerLayout>
      <WalletLoader
        onDisconnected={() => <ConnectWalletMessage />}
        onConnected={() => <SellerItemsScreen />}
      />
    </SellerLayout>
  )
}

export default Page
