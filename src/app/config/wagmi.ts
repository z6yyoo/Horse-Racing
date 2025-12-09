import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
    chains: [base],
    connectors: [
        injected({ shimDisconnect: true }),
        coinbaseWallet({
            appName: 'Horse Racing',
            appLogoUrl: 'https://bmadv6.vercel.app/logo.png'
        }),
    ],
    transports: {
        [base.id]: http('https://mainnet.base.org')
    },
    ssr: true,
})
