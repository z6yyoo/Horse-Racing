'use client'

import { useAccount } from 'wagmi'
import { useContractLeaderboard, usePlayerRank, useHorseRacingContract } from './useContract'
import type { LeaderboardEntry } from '@/types'

export function useLeaderboard() {
    const { address, isConnected } = useAccount()
    const { leaderboard: contractLeaderboard, refetch } = useContractLeaderboard(10)
    const { rank } = usePlayerRank(address)
    const { updateLeaderboard: updateContract, isPending } = useHorseRacingContract()

    // Format contract leaderboard for display
    const leaderboard: LeaderboardEntry[] = contractLeaderboard
        ? contractLeaderboard.map(entry => ({
            address: entry.playerAddress,
            points: Number(entry.points),
            wins: Number(entry.wins),
            displayName: entry.displayName || `${entry.playerAddress.slice(0, 6)}...${entry.playerAddress.slice(-4)}`
        }))
        : []

    // Update leaderboard - requires wallet signature
    const updateLeaderboard = async (points: number, wins: number, races: number = 0) => {
        if (!address || !isConnected) {
            alert('⚠️ Please connect your wallet to save your score on the leaderboard!')
            return
        }

        const displayName = `${address.slice(0, 6)}...${address.slice(-4)}`

        try {
            // Call smart contract to update leaderboard (requires signature)
            updateContract(points, wins, races, displayName)
            alert('⏳ Transaction submitted! Please sign to update leaderboard...')

            // Refetch after a delay
            setTimeout(() => {
                refetch()
            }, 3000)
        } catch (error) {
            console.error('Error updating leaderboard:', error)
            alert('❌ Failed to update leaderboard')
        }
    }

    const getPlayerRank = () => {
        return rank > 0 ? rank : null
    }

    return {
        leaderboard,
        updateLeaderboard,
        getPlayerRank,
        isPending,
        refetch
    }
}
