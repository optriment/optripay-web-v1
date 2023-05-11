import React from 'react'
import { ConnectWalletMessage, WalletLoader } from '@/components'
import { useHasMounted } from '@/hooks'
import { SellerLayout } from '@/layouts'
import { SellerDashboardScreen } from '@/screens/Seller'

const Page: React.FC = () => {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return <p>Not mounted yet</p>
  }

  return (
    <SellerLayout>
      <WalletLoader
        onDisconnected={() => <ConnectWalletMessage />}
        onConnected={() => <SellerDashboardScreen />}
      />
    </SellerLayout>
  )
}

export default Page
