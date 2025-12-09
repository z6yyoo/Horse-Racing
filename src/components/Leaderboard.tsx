'use client'

import { useLeaderboard } from '@/hooks/useLeaderboard'
import { Trophy, Medal, Award } from 'lucide-react'

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
                {leaderboard.map((entry, index) => (
                    <div
                        key={entry.address}
                        className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <div className="w-8 flex justify-center">
                            {getRankIcon(index + 1)}
                        </div>

                        <div className="flex-1">
                            <p className="font-mono text-sm">{entry.displayName}</p>
                            <p className="text-xs text-gray-400">{entry.wins} wins</p>
                        </div>

                        <div className="text-right">
                            <p className="font-bold text-yellow-400">{entry.points.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">points</p>
                        </div>
                    </div>
                ))}

                {leaderboard.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                        No players yet. Be the first!
                    </p>
                )}
            </div>
        </div>
    )
}
