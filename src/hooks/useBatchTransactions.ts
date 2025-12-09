'use client'

import { useSendCalls, useCapabilities } from 'wagmi/experimental'
import { useAccount } from 'wagmi'
import { encodeFunctionData } from 'viem'
import { HORSE_RACING_ABI, HORSE_RACING_ADDRESS } from '@/contracts/HorseRacingABI'
import { base } from 'wagmi/chains'

export function useBatchTransactions() {
  const { address } = useAccount()
  const { data: capabilities } = useCapabilities()
  const { sendCalls, data: callsId, isPending } = useSendCalls()

  // Check if wallet supports batching
  const supportsBatching = capabilities?.[base.id]?.atomicBatch?.supported ?? false

  // Batch claim bonus and update leaderboard
  const batchClaimAndUpdate = async (points: number, wins: number, races: number, displayName: string) => {
    if (!address) return

    const calls = []

    // Add claim daily bonus call
    calls.push({
      to: HORSE_RACING_ADDRESS,
      data: encodeFunctionData({
        abi: HORSE_RACING_ABI,
        functionName: 'claimDailyBonus',
      }),
    })

    // Add update leaderboard call
    calls.push({
      to: HORSE_RACING_ADDRESS,
      data: encodeFunctionData({
        abi: HORSE_RACING_ABI,
        functionName: 'updateLeaderboard',
        args: [BigInt(points), BigInt(wins), BigInt(races), displayName],
      }),
    })

    try {
      sendCalls({ calls })
    } catch (error) {
      console.error('Batch transaction error:', error)
      throw error
    }
  }

  // Batch multiple leaderboard updates (if needed in future)
  const batchUpdateLeaderboard = async (updates: Array<{ points: number; wins: number; races: number; displayName: string }>) => {
    if (!address) return

    const calls = updates.map(update => ({
      to: HORSE_RACING_ADDRESS,
      data: encodeFunctionData({
        abi: HORSE_RACING_ABI,
        functionName: 'updateLeaderboard',
        args: [BigInt(update.points), BigInt(update.wins), BigInt(update.races), update.displayName],
      }),
    }))

    try {
      sendCalls({ calls })
    } catch (error) {
      console.error('Batch transaction error:', error)
      throw error
    }
  }

  return {
    batchClaimAndUpdate,
    batchUpdateLeaderboard,
    supportsBatching,
    isPending,
    callsId,
  }
}
