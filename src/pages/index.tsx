import React from 'react'
import { MainLayout } from '@/layouts'
import { LandingPage } from '@/screens/Landing'
import { getIsSsrMobile } from '@/utils/get-is-ssr-mobile'
import { useIsMobile } from '@/utils/use-is-mobile'
import type { GetServerSidePropsContext } from 'next'

export default function Page() {
  const isMobile = useIsMobile()

  return (
    <MainLayout isMobile={isMobile}>
      <LandingPage />
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
