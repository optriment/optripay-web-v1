/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  reactStrictMode: true,

  trailingSlash: false,

  output: 'standalone',

  productionBrowserSourceMaps: false,

  publicRuntimeConfig: {
    // Will be available on both server and client
    domain: process.env.DOMAIN,
    tronNetwork: process.env.TRON_NETWORK,
    contractAddress: process.env.CONTRACT_ADDRESS,
    tokenAddress: process.env.TOKEN_ADDRESS,
    tokenDecimals: process.env.TOKEN_DECIMALS,
    tokenSymbol: process.env.TOKEN_SYMBOL,
  },
}

module.exports = nextConfig
