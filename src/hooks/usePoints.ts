'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

const INITIAL_POINTS = 5000
const STORAGE_KEY = 'bmad_points'

export function usePoints() {
    const { address } = useAccount()

    const [points, setPoints] = useState<number>(() => {
        if (typeof window === 'undefined') return INITIAL_POINTS

        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const data = JSON.parse(saved)
                return data.points || INITIAL_POINTS
            } catch {
                return INITIAL_POINTS
            }
        }
        return INITIAL_POINTS
    })

    // Auto-save to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                points,
                address,
                lastUpdate: Date.now()
            }))
        }
    }, [points, address])

    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount)
    }

    const deductPoints = (amount: number) => {
        setPoints(prev => Math.max(0, prev - amount))
    }

    const resetPoints = () => {
        setPoints(INITIAL_POINTS)
    }

    return {
        points,
        addPoints,
        deductPoints,
        resetPoints
    }
}
