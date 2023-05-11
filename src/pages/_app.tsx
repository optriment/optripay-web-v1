import {
  WalletDisconnectedError,
  WalletNotFoundError,
} from '@tronweb3/tronwallet-abstract-adapter'
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks'
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui'
import { TronLinkAdapter } from '@tronweb3/tronwallet-adapters'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import Web3Provider from '@/context/web3-context'
import { IsSsrMobileContext } from '@/utils/use-is-mobile'
import type { WalletError } from '@tronweb3/tronwallet-abstract-adapter'
import type { AppProps } from 'next/app'

import 'semantic-ui-css/semantic.min.css'
import '@tronweb3/tronwallet-adapter-react-ui/style.css'

export default function App({
  Component,
  pageProps,
}: AppProps<{ isSsrMobile: boolean }>) {
  const router = useRouter()

  function onError(e: WalletError) {
    if (e instanceof WalletNotFoundError) {
      console.error(e.message)
    } else if (e instanceof WalletDisconnectedError) {
      console.error(e.message)
    } else {
      console.error(e.message)
    }
  }

  const adapters = useMemo(function () {
    const tronLink1 = new TronLinkAdapter()
    return [tronLink1]
  }, [])

  return (
    <WalletProvider onError={onError} autoConnect={true} adapters={adapters}>
      <WalletModalProvider>
        <Web3Provider>
          <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
            <Component key={router.asPath} {...pageProps} />
          </IsSsrMobileContext.Provider>
        </Web3Provider>
      </WalletModalProvider>
    </WalletProvider>
  )
}
