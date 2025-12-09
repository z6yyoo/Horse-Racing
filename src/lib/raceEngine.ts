import { RaceResult } from '@/types'

// Function to generate blockchain seed
export function generateBlockchainSeed(): number {
    if (typeof window === 'undefined') return Date.now()

    // For demo, use timestamp + random
    // In real project, fetch block hash from Base chain
    const timestamp = Date.now()
    const random = Math.random()
    return Math.floor(timestamp * random)
}

// Seeded random number generator
function seededRandom(seed: number): () => number {
    let state = seed
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296
        return state / 4294967296
    }
}

// Simulate race
export function simulateRace(seed?: number): RaceResult {
    const raceSeed = seed || generateBlockchainSeed()
    const random = seededRandom(raceSeed)

    // Generate random speed for each horse
    const horseSpeeds = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        speed: 0.5 + random() * 0.5, // Speed 0.5-1.0
        position: 0
    }))

    // Simulate race (100 steps)
    for (let step = 0; step < 100; step++) {
        horseSpeeds.forEach(horse => {
            horse.position += horse.speed * (0.8 + random() * 0.4)
        })
    }

    // Sort by position
    const sorted = [...horseSpeeds].sort((a, b) => b.position - a.position)

    return {
        winnerId: sorted[0].id,
        positions: sorted.map(h => h.id),
        duration: 8000 + Math.floor(random() * 4000) // 8-12 seconds
    }
}

// Calculate winnings from pool
export function calculateWinnings(
    bets: Map<number, number>, // horseId -> total points bet
    winnerId: number,
    totalPool: number
): Map<string, number> {
    const winnings = new Map<string, number>()

    const winnerBets = bets.get(winnerId) || 0
    if (winnerBets === 0) return winnings

    // Winner gets proportional share
    // Simplified version here

    return winnings
}
