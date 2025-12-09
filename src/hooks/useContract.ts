'use client'

import { useWriteContract, useReadContract, useWaitForTransactionReceipt, useCapabilities } from 'wagmi'
import { useSendCalls } from 'wagmi/experimental'
import { encodeFunctionData } from 'viem'
import { base } from 'wagmi/chains'
import { HORSE_RACING_ABI, HORSE_RACING_ADDRESS } from '@/contracts/HorseRacingABI'

export function useHorseRacingContract() {
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  // EIP-5792 batch transaction support
  const { data: capabilities } = useCapabilities()
  const { sendCalls, data: callsId, isPending: isBatchPending } = useSendCalls()
  const supportsBatching = capabilities?.[base.id]?.atomicBatch?.supported ?? false

  // Claim daily bonus
  const claimDailyBonus = () => {
    writeContract({
      address: HORSE_RACING_ADDRESS,
      abi: HORSE_RACING_ABI,
      functionName: 'claimDailyBonus',
    })
  }

  // Update leaderboard
  const updateLeaderboard = (points: number, wins: number, races: number, displayName: string) => {
    writeContract({
      address: HORSE_RACING_ADDRESS,
      abi: HORSE_RACING_ABI,
      functionName: 'updateLeaderboard',
      args: [BigInt(points), BigInt(wins), BigInt(races), displayName],
    })
  }

  // Batch claim bonus and update leaderboard (EIP-5792)
  const batchClaimAndUpdate = (points: number, wins: number, races: number, displayName: string) => {
    if (!supportsBatching) {
      // Fallback to sequential transactions
      claimDailyBonus()
      setTimeout(() => updateLeaderboard(points, wins, races, displayName), 2000)
      return
    }

    const calls = [
      {
        to: HORSE_RACING_ADDRESS,
        data: encodeFunctionData({
          abi: HORSE_RACING_ABI,
          functionName: 'claimDailyBonus',
        }),
      },
      {
        to: HORSE_RACING_ADDRESS,
        data: encodeFunctionData({
          abi: HORSE_RACING_ABI,
          functionName: 'updateLeaderboard',
          args: [BigInt(points), BigInt(wins), BigInt(races), displayName],
        }),
      },
    ]

    sendCalls({ calls })
  }

  return {
    claimDailyBonus,
    updateLeaderboard,
    batchClaimAndUpdate,
    supportsBatching,
    isPending: isPending || isBatchPending,
    isConfirming,
    isSuccess,
    hash,
    callsId,
  }
}

// Check if can claim daily bonus
export function useCanClaimBonus(address?: `0x${string}`) {
  const { data: canClaim } = useReadContract({
    address: HORSE_RACING_ADDRESS,
    abi: HORSE_RACING_ABI,
    functionName: 'canClaimDailyBonus',
    args: address ? [address] : undefined,
  })

  return { canClaim: !!canClaim }
}

// Get player data from contract
export function usePlayerData(address?: `0x${string}`) {
  const { data, refetch } = useReadContract({
    address: HORSE_RACING_ADDRESS,
    abi: HORSE_RACING_ABI,
    functionName: 'getPlayer',
    args: address ? [address] : undefined,
  })

  return {
    playerData: data as [bigint, bigint, bigint, bigint, string] | undefined,
    refetch
  }
}

// Get leaderboard from contract
export function useContractLeaderboard(count: number = 10) {
  const { data, refetch } = useReadContract({
    address: HORSE_RACING_ADDRESS,
    abi: HORSE_RACING_ABI,
    functionName: 'getLeaderboard',
    args: [BigInt(count)],
  })

  return {
    leaderboard: data as Array<{ playerAddress: string; points: bigint; wins: bigint; displayName: string }> | undefined,
    refetch
  }
}

// Get player rank
export function usePlayerRank(address?: `0x${string}`) {
  const { data } = useReadContract({
    address: HORSE_RACING_ADDRESS,
    abi: HORSE_RACING_ABI,
    functionName: 'getPlayerRank',
    args: address ? [address] : undefined,
  })

  return { rank: data ? Number(data) : 0 }
}
