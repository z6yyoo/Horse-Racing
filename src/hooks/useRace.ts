'use client'

import { useState } from 'react'
import { simulateRace } from '@/lib/raceEngine'
import { getBlockchainRandomSeed } from '@/lib/random'
import type { RaceResult, Bet } from '@/types'

export function useRace() {
    const [isRacing, setIsRacing] = useState(false)
    const [result, setResult] = useState<RaceResult | null>(null)
    const [currentBets, setCurrentBets] = useState<Map<number, number>>(new Map())
    const [pool, setPool] = useState(0)

    const placeBet = (horseId: number, amount: number) => {
        setCurrentBets(prev => {
            const newBets = new Map(prev)
            const current = newBets.get(horseId) || 0
            newBets.set(horseId, current + amount)
            return newBets
        })
        setPool(prev => prev + amount)
    }

    const startRace = async () => {
        if (isRacing) return

        setIsRacing(true)
        setResult(null)

        try {
            // Wait for animation start
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Random race result with blockchain seed
            const seed = await getBlockchainRandomSeed()
            const raceResult = simulateRace(seed)

            // Wait for race finish
            await new Promise(resolve => setTimeout(resolve, raceResult.duration))

            setResult(raceResult)
            return raceResult
        } finally {
            setIsRacing(false)
        }
    }

    const resetRace = () => {
        setResult(null)
        setCurrentBets(new Map())
        setPool(0)
    }

    return {
        isRacing,
        result,
        currentBets,
        pool,
        placeBet,
        startRace,
        resetRace
    }
}
