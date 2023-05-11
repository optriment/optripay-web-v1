import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui'
import { useRouter } from 'next/router'
import React from 'react'
import { ConnectWalletMessage, WalletLoader } from '@/components'
import { useHasMounted } from '@/hooks'
import { MainLayout } from '@/layouts'
import { MarketplaceBuyItemScreen } from '@/screens/Marketplace'
import { getIsSsrMobile } from '@/utils/get-is-ssr-mobile'
import { useIsMobile } from '@/utils/use-is-mobile'
import type { GetServerSidePropsContext } from 'next'

export default function Page() {
  const isMobile = useIsMobile()
  const router = useRouter()
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return <p>Not mounted yet</p>
  }

  const itemId = router.query.id as string

  return (
    <MainLayout isMobile={isMobile}>
      <WalletLoader
        onDisconnected={() => (
          <>
            <ConnectWalletMessage />
            <WalletActionButton />
          </>
        )}
        onConnected={() => <MarketplaceBuyItemScreen itemId={itemId} />}
      />
    </MainLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      isSsrMobile: getIsSsrMobile(context),
    },
  }
}
