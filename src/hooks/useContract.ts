'use client'

import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'
import { HORSE_RACING_ABI, HORSE_RACING_ADDRESS } from '@/contracts/HorseRacingABI'

export function useHorseRacingContract() {
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

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

  return {
    claimDailyBonus,
    updateLeaderboard,
    isPending,
    isConfirming,
    isSuccess,
    hash,
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
