'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useState } from 'react'
import { Wallet, X } from 'lucide-react'

export default function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { connectors, connect } = useConnect()
    const { disconnect } = useDisconnect()
    const [showModal, setShowModal] = useState(false)

    if (isConnected && address) {
        return (
            <button
                onClick={() => disconnect()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors"
            >
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-mono">
                    {address.slice(0, 6)}...{address.slice(-4)}
                </span>
            </button>
        )
    }

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
            >
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-semibold">Connect Wallet</span>
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full border-2 border-yellow-500">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-yellow-400">Connect Wallet</h3>
                            <button onClick={() => setShowModal(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-400 mb-4">
                            Connect your wallet to save your score on the leaderboard
                        </p>

                        <div className="space-y-2">
                            {connectors.map((connector) => (
                                <button
                                    key={connector.uid}
                                    onClick={() => {
                                        connect({ connector })
                                        setShowModal(false)
                                    }}
                                    className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors"
                                >
                                    {connector.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
