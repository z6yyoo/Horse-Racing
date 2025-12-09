'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect, type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import sdk from '@farcaster/miniapp-sdk'
import { config } from '@/app/config/wagmi'

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Initialize Farcaster MiniApp SDK
        const load = async () => {
            try {
                await sdk.actions.ready()
            } catch (error) {
                console.error('SDK init error:', error)
            }
        }
        load()
    }, [])

    if (!mounted) return null

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
