'use client'

import { useAccount } from 'wagmi'
import { useMemo } from 'react'

// Generate avatar from address
function generateAvatar(address: string): string {
  // Use DiceBear Avatars API for consistent avatars
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`
}

// Generate username from address
function generateUsername(address: string): string {
  const hash = address.toLowerCase().slice(2)
  const adjectives = ['Swift', 'Lucky', 'Bold', 'Swift', 'Brave', 'Wild', 'Fast', 'Strong']
  const nouns = ['Racer', 'Champion', 'Winner', 'Rider', 'Player', 'Jockey', 'Star', 'Pro']

  const adjIndex = parseInt(hash.slice(0, 8), 16) % adjectives.length
  const nounIndex = parseInt(hash.slice(8, 16), 16) % nouns.length
  const number = parseInt(hash.slice(-4), 16) % 9999

  return `${adjectives[adjIndex]}${nouns[nounIndex]}${number}`
}

interface UserProfileProps {
  showPoints?: boolean
  points?: number
  size?: 'sm' | 'md' | 'lg'
}

export default function UserProfile({ showPoints, points, size = 'md' }: UserProfileProps) {
  const { address, isConnected } = useAccount()

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const avatar = useMemo(() => {
    return address ? generateAvatar(address) : null
  }, [address])

  const username = useMemo(() => {
    return address ? generateUsername(address) : 'Guest'
  }, [address])

  if (!isConnected || !address) {
    return (
      <div className="flex items-center gap-3">
        <div className={`${sizeClasses[size]} bg-gray-700 rounded-full flex items-center justify-center`}>
          <span className="text-gray-400">?</span>
        </div>
        <div>
          <p className={`${textSizeClasses[size]} font-semibold text-gray-400`}>Guest</p>
          {showPoints && (
            <p className="text-xs text-gray-500">{points?.toLocaleString() || 0} points</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-yellow-500 bg-gray-800`}>
        {avatar && (
          <img
            src={avatar}
            alt={username}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div>
        <p className={`${textSizeClasses[size]} font-semibold text-yellow-400`}>{username}</p>
        {showPoints && (
          <p className="text-xs text-gray-400">{points?.toLocaleString() || 0} points</p>
        )}
      </div>
    </div>
  )
}
