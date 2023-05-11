import React from 'react'
import { ConnectWalletMessage, WalletLoader } from '@/components'
import { useHasMounted } from '@/hooks'
import { BuyerLayout } from '@/layouts'
import { BuyerPurchasesScreen } from '@/screens/Buyer'

const Page: React.FC = () => {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return <p>Not mounted yet</p>
  }

  return (
    <BuyerLayout>
      <WalletLoader
        onDisconnected={() => <ConnectWalletMessage />}
        onConnected={() => <BuyerPurchasesScreen />}
      />
    </BuyerLayout>
  )
}

export default Page
