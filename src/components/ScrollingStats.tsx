'use client'

import { useEffect, useState } from 'react'
import { generateRandomStats } from '@/lib/horses'

interface ScrollingStatsProps {
    horseId: number
}

export default function ScrollingStats({ horseId }: ScrollingStatsProps) {
    const [stats, setStats] = useState('')

    useEffect(() => {
        setStats(generateRandomStats(horseId))
    }, [horseId])

    return (
        <div className="w-full overflow-hidden bg-gray-900 border-y-2 border-yellow-500 py-2">
            <div className="animate-scroll whitespace-nowrap">
                <span className="text-yellow-400 font-mono text-sm px-4">
                    {stats} {/* Repeated for continuous scroll */}
                    {' • ' + stats}
                    {' • ' + stats}
                </span>
            </div>
        </div>
    )
}
