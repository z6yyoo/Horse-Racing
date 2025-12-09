'use client'

import { useAccount } from 'wagmi'
import { useCanClaimBonus, useHorseRacingContract } from './useContract'
import { useEffect } from 'react'

const DAILY_BONUS = 1000

export function useDailyBonus() {
    const { address, isConnected } = useAccount()
    const { canClaim: canClaimFromContract } = useCanClaimBonus(address)
    const { claimDailyBonus, isPending, isSuccess } = useHorseRacingContract()

    // If connected, use contract data
    const canClaim = isConnected ? canClaimFromContract : false

    const claimBonus = async (addPoints: (amount: number) => void) => {
        if (!isConnected || !canClaim) return false

        try {
            // Call smart contract to claim bonus
            claimDailyBonus()
            return true
        } catch (error) {
            console.error('Error claiming bonus:', error)
            return false
        }
    }

    // Add points locally when transaction succeeds
    useEffect(() => {
        if (isSuccess) {
            // Points will be added through the callback
        }
    }, [isSuccess])

    return {
        canClaim,
        claimBonus,
        bonusAmount: DAILY_BONUS,
        isPending,
        isSuccess
    }
}
