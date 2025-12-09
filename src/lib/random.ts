// Use Web3 timestamp + block hash as seed
export async function getBlockchainRandomSeed(): Promise<number> {
    if (typeof window === 'undefined') return Date.now()

    try {
        // In real project, use block hash from Base chain
        // For demo, use timestamp + performance.now()
        const timestamp = Date.now()
        const performance = window.performance.now()
        const userAgent = window.navigator.userAgent.length

        return Math.floor((timestamp * performance) / userAgent)
    } catch (error) {
        console.error('Error getting blockchain seed:', error)
        return Date.now()
    }
}

// For provably fair display
export function generateRaceHash(seed: number): string {
    // Simple hash function
    let hash = seed.toString()
    let hashValue = 0

    for (let i = 0; i < hash.length; i++) {
        const char = hash.charCodeAt(i)
        hashValue = ((hashValue << 5) - hashValue) + char
        hashValue = hashValue & hashValue
    }

    return Math.abs(hashValue).toString(16).padStart(8, '0')
}
