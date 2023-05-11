import { useRouter } from 'next/router'
import React from 'react'
import { ConnectWalletMessage, WalletLoader } from '@/components'
import { useHasMounted } from '@/hooks/use-has-mounted'
import { SellerLayout } from '@/layouts'
import { SellerViewItemPurchasesScreen } from '@/screens/Seller'

const Page: React.FC = () => {
  const router = useRouter()
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return <p>Not mounted yet</p>
  }

  const itemId = router.query.id as string

  return (
    <SellerLayout>
      <WalletLoader
        onDisconnected={() => <ConnectWalletMessage />}
        onConnected={() => <SellerViewItemPurchasesScreen itemId={itemId} />}
      />
    </SellerLayout>
  )
}

export default Page
