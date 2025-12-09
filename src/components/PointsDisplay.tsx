'use client'

import { Coins, Gift } from 'lucide-react'
import { useDailyBonus } from '@/hooks/useDailyBonus'
import { useAccount } from 'wagmi'

interface PointsDisplayProps {
    points: number
    addPoints: (amount: number) => void
}

export default function PointsDisplay({ points, addPoints }: PointsDisplayProps) {
    const { canClaim, claimBonus, bonusAmount } = useDailyBonus()
    const { isConnected } = useAccount()

    const handleClaim = async () => {
        if (!isConnected) {
            alert('⚠️ Please connect your wallet to claim daily bonus!')
            return
        }

        const claimed = await claimBonus(addPoints)
        if (claimed) {
            // Transaction submitted, wait for confirmation
            alert('⏳ Transaction submitted! Please wait for confirmation...')
        }
    }

    return (
        <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg flex items-center gap-2">
                <Coins className="w-5 h-5" />
                <div className="flex flex-col">
                    <span className="text-xs text-yellow-200">Your Points</span>
                    <span className="text-xl font-bold">{points.toLocaleString()}</span>
                </div>
            </div>

            {canClaim && (
                <button
                    onClick={handleClaim}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg flex items-center gap-2 animate-pulse hover:scale-105 transition-transform"
                >
                    <Gift className="w-5 h-5" />
                    <span className="text-sm font-semibold">Claim {bonusAmount}</span>
                </button>
            )}
        </div>
    )
}
