'use client'

import { useLeaderboard } from '@/hooks/useLeaderboard'
import { Trophy, Medal, Award } from 'lucide-react'

// Generate avatar from address
function generateAvatar(address: string): string {
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

export default function Leaderboard() {
    const { leaderboard, getPlayerRank } = useLeaderboard()
    const playerRank = getPlayerRank()

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />
        if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
        if (rank === 3) return <Award className="w-5 h-5 text-orange-600" />
        return <span className="text-gray-500">#{rank}</span>
    }

    return (
        <div className="bg-gray-900 border-2 border-yellow-500 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Leaderboard
            </h3>

            {playerRank && (
                <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500 rounded-lg">
                    <p className="text-sm text-blue-400">
                        Your Rank: <span className="font-bold">#{playerRank}</span>
                    </p>
                </div>
            )}

            <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                    const avatar = generateAvatar(entry.address)
                    const username = generateUsername(entry.address)

                    return (
                        <div
                            key={entry.address}
                            className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <div className="w-8 flex justify-center">
                                {getRankIcon(index + 1)}
                            </div>

                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500/50 flex-shrink-0">
                                <img src={avatar} alt={username} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{username}</p>
                                <p className="text-xs text-gray-400">{entry.wins} wins</p>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-yellow-400">{entry.points.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">points</p>
                            </div>
                        </div>
                    )
                })}

                {leaderboard.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                        No players yet. Be the first!
                    </p>
                )}
            </div>
        </div>
    )
}
