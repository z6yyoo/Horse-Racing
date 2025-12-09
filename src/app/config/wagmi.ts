import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors'

const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID' // Get from https://cloud.walletconnect.com

export const config = createConfig({
    chains: [base],
    connectors: [
        injected({ shimDisconnect: true }),
        coinbaseWallet({
            appName: 'BMAD Horse Racing',
            appLogoUrl: 'https://yourdomain.vercel.app/logo.png'
        }),
        walletConnect({ projectId })
    ],
    transports: {
        [base.id]: http('https://mainnet.base.org')
    },
    ssr: true,
})
