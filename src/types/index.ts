export interface Horse {
    id: number
    name: string
    color: string
    odds: string
    wins: number
    races: number
    specialSkill: string
    funFact: string
    imageUrl: string
}

export interface Bet {
    horseId: number
    amount: number
}

export interface RaceResult {
    winnerId: number
    positions: number[]
    duration: number
}

export interface Player {
    address?: string
    points: number
    totalWins: number
    totalRaces: number
    lastLoginDate: string
}

export interface LeaderboardEntry {
    address: string
    points: number
    wins: number
    displayName?: string
}
